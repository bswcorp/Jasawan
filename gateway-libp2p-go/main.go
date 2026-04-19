package main

import (
    "context"
    "fmt"
    "os"
    "time"

    "github.com/jasawan/gateway-libp2p-go/gateway"
    "github.com/jasawan/gateway-libp2p-go/node"
)

func main() {
    ctx := context.Background()
    mode := os.Getenv("MODE")

    if mode == "node" {
        fmt.Println("Starting SKAI node receiver...")
        if err := node.StartReceiver(ctx); err != nil {
            fmt.Println("Receiver error:", err)
        }
        return
    }

    fmt.Println("Starting Gateway Adapter (MQTT -> libp2p)...")
    libp2pHost, err := gateway.NewLibp2pHost(ctx)
    if err != nil {
        fmt.Println("libp2p host error:", err)
        return
    }
    defer libp2pHost.Close()

    mqttBridge := gateway.NewMQTTBridge(libp2pHost)
    if err := mqttBridge.Start(); err != nil {
        fmt.Println("MQTT bridge error:", err)
        return
    }

    for {
        time.Sleep(10 * time.Second)
    }
}
