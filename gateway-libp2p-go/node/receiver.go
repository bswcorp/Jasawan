package node

import (
    "context"
    "fmt"

    host "github.com/libp2p/go-libp2p-core/host"
    network "github.com/libp2p/go-libp2p-core/network"
)

func StartReceiver(ctx context.Context) error {
    h, err := host.New()
    if err != nil {
        return err
    }
    h.SetStreamHandler("/skai/1.0.0", func(s network.Stream) {
        defer s.Close()
        buf := make([]byte, 8192)
        n, _ := s.Read(buf)
        fmt.Println("Node received artifact:", string(buf[:n]))
        // TODO: verify signature, apply CRDT merge or Raft entry
        s.Write([]byte("RECEIVED"))
    })
    fmt.Println("Node libp2p host started, waiting for artifacts...")
    <-ctx.Done()
    _ = h.Close()
    return nil
}
