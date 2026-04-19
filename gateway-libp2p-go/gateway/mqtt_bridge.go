package gateway

import (
    "fmt"
    "os"
    "time"

    mqtt "github.com/eclipse/paho.mqtt.golang"
    host "github.com/libp2p/go-libp2p-core/host"
)

type MQTTBridge struct {
    host host.Host
}

func NewMQTTBridge(h host.Host) *MQTTBridge {
    return &MQTTBridge{host: h}
}

func (b *MQTTBridge) Start() error {
    broker := os.Getenv("AZURE_MQTT_BROKER")
    if broker == "" {
        broker = "tcp://test.mosquitto.org:1883"
    }
    topic := os.Getenv("AZURE_MQTT_TOPIC")
    if topic == "" {
        topic = "skai/telemetry"
    }

    opts := mqtt.NewClientOptions().AddBroker(broker).SetClientID("skai-gateway-poc")
    client := mqtt.NewClient(opts)
    if token := client.Connect(); token.Wait() && token.Error() != nil {
        return token.Error()
    }

    handler := func(client mqtt.Client, msg mqtt.Message) {
        payload := msg.Payload()
        fmt.Println("MQTT received:", string(payload))
        artifact := createArtifact(payload)
        if err := SendToPeers(b.host, artifact); err != nil {
            fmt.Println("SendToPeers error:", err)
        }
    }

    if token := client.Subscribe(topic, 0, handler); token.Wait() && token.Error() != nil {
        return token.Error()
    }

    fmt.Println("MQTT bridge subscribed to", topic)
    for {
        time.Sleep(5 * time.Second)
    }
}

func createArtifact(payload []byte) []byte {
    return []byte(fmt.Sprintf("{\"type\":\"AksaraArtifact\",\"payload\":\"%s\",\"ts\":%d}", string(payload), time.Now().Unix()))
}
