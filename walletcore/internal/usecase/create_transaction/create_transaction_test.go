package create_transaction

import (
	"context"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
	"github.com/virb30/curso-fc-challenges/desafio-eda/internal/entity"
	"github.com/virb30/curso-fc-challenges/desafio-eda/internal/event"
	"github.com/virb30/curso-fc-challenges/desafio-eda/internal/usecase/mocks"
	"github.com/virb30/curso-fc-challenges/desafio-eda/pkg/events"
)

func TestCreateTransactionUseCase_Execute(t *testing.T) {
	client1, _ := entity.NewClient("John Doe", "j@j.com")
	account1 := entity.NewAccount(client1)
	account1.Credit(1000)

	client2, _ := entity.NewClient("John Doe 2", "j@j2.com")
	account2 := entity.NewAccount(client2)
	account2.Credit(1000)

	mockUow := &mocks.UowMock{}
	mockUow.On("Do", mock.Anything, mock.Anything).Return(nil)

	inputDto := CreateTransactionInputDTO{
		AccountIDFrom: account1.ID,
		AccountIDTo:   account2.ID,
		Amount:        100,
	}

	dispatcher := events.NewEventDispatcher()
	transactionCreatedEvent := event.NewTransactionCreated()
	balanceUpdatedEvent := event.NewBalanceUpdated()
	ctx := context.Background()

	uc := NewCreateTransactionUseCase(
		mockUow,
		dispatcher,
		transactionCreatedEvent,
		balanceUpdatedEvent,
	)
	output, err := uc.Execute(ctx, inputDto)
	assert.Nil(t, err)
	assert.NotNil(t, output)
	mockUow.AssertExpectations(t)
	mockUow.AssertNumberOfCalls(t, "Do", 1)
}
