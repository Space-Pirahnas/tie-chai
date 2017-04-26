# Project Name

Tie-Chai 

## Team

  - __Product Owner__: Felix Tran
  - __Scrum Master__: Daryl Cheng
  - __Lead Front End Engineer__: Yang(Summer) Ji
  - __Development Team Members__: Veer Gangwal

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
1. [Team](#team)

## Usage

Built for professionals with an interest in expanding their network. Tie-Chai allows users to match with professionals with similar interests. Users can then form connections off mutual interest and communicate meetings and host events on a responsive interface.

## Requirements

- Golang 1.8.x
- Node 7.5.x
- PostgreSQL 9.1.x
- Redis 2.6.x
- Glide 0.12.x

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install
glide install
go get github.com/jinzhu/gorm
go get github.com/jinzhu/gorm/dialects/postgres
go get github.com/mediocregopher/radix.v2/pool
go get golang.org/x/crypto/bcrypt
go get github.com/dgrijalva/jwt-go
go get github.com/satori/go.uuid
go get github.com/SlyMarbo/gmail
go get github.com/aws/aws-sdk-go/aws
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
