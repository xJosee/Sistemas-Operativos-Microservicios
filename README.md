[![GitHub contributors](https://img.shields.io/github/contributors/Naereen/StrapDown.js.svg)](https://github.com/xJosee/SO1A_G29_Proyecto1/contributors/)
[![GitHub commits](https://img.shields.io/github/commits-since/Naereen/StrapDown.js/v1.0.0.svg)](https://github.com/xJosee/SO1A_G29_Proyecto1/commit/)
[![made-in-VSCode](https://img.shields.io/badge/Made%20in-VSCode-1f425f.svg)](https://code.visualstudio.com/)
[![made-with-Go](https://img.shields.io/badge/Made%20with-Go-1f425f.svg)](http://golang.org)
[![made-with-js](https://img.shields.io/badge/Made%20with-Docker-red.svg)](https://www.docker.com/)
[![made-with-js](https://img.shields.io/badge/Made%20with-JS-yellow.svg)](https://www.javascript.com/)
[![https://covid-app-wlvcuo66pq-uc.a.run.app](https://img.shields.io/website-up-down-green-red/http/shields.io.svg)](https://covid-app-wlvcuo66pq-uc.a.run.app)


# Covid App Cloud
## Contenido
- [Covid App Cloud](#covid-app-cloud)
  * [Tráfico y Middlewares](#tráfico-y-middlewares)
  * [Almacenamiento y procesamiento de datos](#almacenamiento-y-procesamiento-de-datos)
  * [Análisis y visualización de datos](#análisis-y-visualización-de-datos)
  * [Módulos de RAM y procesos](#módulos-de-ram-y-procesos)

Proyecto 1 , Sistemas Operativos 1 del 1er Semestre de 2021.

Un proyecto relacionado con tecnologías de Middleware, módulos del kernel de Linux, tecnologías de almacenamiento innovadoras como NoSQL y así como tecnologías relacionadas al desarrollo web como NodeJS y ReactJS.

Autores del proyecto:
- [josemoran40 (José Morán)](https://github.com/josemoran40)
- [xJosee (José Herrera)](https://github.com/xJosee)
- [JACLs (Jorge Canté)](https://github.com/JACLs)


## Tráfico y Middlewares
Este proyecto se llevo a acabo con utilizacon Locust para la simulación de generación de tráfico de registros médicos sobre pacientes de COVID-19, para distribuir la carga de este tráfico se uso un LoadBalancer de Google Cloud y de la ayuda de los middlewares RabbitMQ, NATS, gRPC y Google PubSub, para simular distintas fuentes de flujo de datos.

Para conocer más detalles sobre el uso de Locust en el proyecto, dirigete [aquí](locust)

Para conocer más detalles sobre el uso de los middlewares en el proyecto, dirigete al de tu interes:
- [Acerca del uso de Google PubSub en el proyecto](googlepubsub)
- [Acerca del uso de gRPC en el proyecto](grpc)
- [Acerca del uso de RabbitMQ en el proyecto](rabbitmq)
- [Acerca del uso de NATS en el proyecto](nats)

## Almacenamiento y procesamiento de datos
Para la recepción y almacenado de los datos se contó con una API REST basada en NodeJS y una base de datos MongoDB, la instancia donde se ejecutaban estos servicios contaba con modulos capaces de darnos información acerca de los procesos y cantidad de RAM que consumia.

Para conocer más acerca de como se almacenaron y procesaron los datos, dirigete [aquí](server)

## Análisis y visualización de datos
Para poder visualizar los datos recibos en este proyecto, se dispuso de una aplicación en ReactJS implementada en Google Run de Google Cloud, dicha aplicación no solo muestra distintos datos acerca de los datos recopilados por el flujo de datos de la aplicación sino también nos muestra los recursos que se consumen para poder realizar la captura, almacenamiento y distribución de los datos antes mencionados.

Para conocer más acerca de como se analizan y visualizan los datos, dirigete [aquí](web-app)

## Módulos de RAM y procesos
En el proyecto se implemento un módulo en el kernel para conocer los procesos y la RAM que se consumen dentro del servidor que almacena y procesa los datos, a manera de demostrar la integración de módulos al kernel Linux.

Para conocer más detalles de los módulos:
- [Implementación del módulo de RAM](rammodule)
- [Implementación del módulo de procesos](processmodule)