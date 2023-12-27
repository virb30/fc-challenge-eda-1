package gateway

import "github.com/virb30/curso-fc-challenges/desafio-eda/internal/entity"

type ClientGateway interface {
	Get(id string) (*entity.Client, error)
	Save(client *entity.Client) error
}
