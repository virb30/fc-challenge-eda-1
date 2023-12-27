package gateway

import "github.com/virb30/curso-fc-challenges/desafio-eda/internal/entity"

type TransactionGateway interface {
	Create(transaction *entity.Transaction) error
}
