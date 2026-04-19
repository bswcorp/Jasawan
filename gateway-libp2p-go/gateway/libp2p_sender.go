package gateway

import (
    "context"
    "fmt"
    "time"

    peerstore "github.com/libp2p/go-libp2p-core/peer"
    host "github.com/libp2p/go-libp2p-core/host"
    network "github.com/libp2p/go-libp2p-core/network"
)

func SendToPeers(h host.Host, artifact []byte) error {
    peers := h.Peerstore().Peers()
    if len(peers) == 0 {
        fmt.Println("No peers known; artifact queued for DTN/store-and-forward (placeholder)")
        return nil
    }
    for _, p := range peers {
        if p == h.ID() {
            continue
        }
        go func(pid peerstore.ID) {
            ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
            defer cancel()
            s, err := h.NewStream(ctx, pid, "/skai/1.0.0")
            if err != nil {
                fmt.Println("NewStream error:", err)
                return
            }
            defer s.Close()
            _, err = s.Write(artifact)
            if err != nil {
                fmt.Println("stream write error:", err)
                return
            }
            buf := make([]byte, 256)
            n, _ := s.Read(buf)
            fmt.Println("Ack from", pid.Pretty(), ":", string(buf[:n]))
        }(p)
    }
    return nil
}

func NewLibp2pHost(ctx context.Context) (host.Host, error) {
    h, err := host.New()
    if err != nil {
        return nil, err
    }
    h.SetStreamHandler("/skai/1.0.0", func(s network.Stream) {
        defer s.Close()
        buf := make([]byte, 4096)
        n, _ := s.Read(buf)
        fmt.Println("Received artifact:", string(buf[:n]))
        s.Write([]byte("ACK"))
    })
    return h, nil
}
