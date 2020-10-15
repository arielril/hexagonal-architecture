package model

// Container is the container for the infrastructure
type Container struct{}

/************** Adapters **************/

// HttpAdapter is the adapter for HTTP connections
type HttpAdapter interface{}

// MessageBusAdapter is the adapter for Messaging communications
type MessageBusAdapter interface{}

/************** Repositories **************/

// PaymentRepository is where all comunication with the external world of payment happens
type PaymentRepository interface{}

// UserRepository is where all comunication with the external world of user happens
type UserRepository interface{}
