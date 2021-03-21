# Covid App Cloud
Proyecto 1 , Sistemas Operativos 1 del 1er Semestre de 2021

Autores del proyecto:
- [josemoran40 (José Morán)](https://github.com/josemoran40)
- [xJosee (José Herrera)](https://github.com/xJosee)
- [JACLs (Jorge Canté)](https://github.com/JACLs)

## Tráfico y Middlewares
Este proyecto se llevo a acabo con utilizacon Locust para la simulación de generación de tráfico de registros médicos sobre pacientes de COVID-19, para distribuir la carga de este tráfico se uso un LoadBalancer de Google Cloud y de la ayuda de los middlewares RabbitMQ, NATS, gRPC y Google PubSub, para simular distintas fuentes de flujo de datos.

Para conocer más detalles sobre el uso de Locust en el proyecto, dirigete [aquí](https://google.com)

Para conocer más detalles sobre el uso de los middlewares en el proyecto, dirigete al de tu interes:
- [Acerca del uso de Google PubSub en el proyecto](https://google.com)
- [Acerca del uso de gRPC en el proyecto](https://google.com)
- [Acerca del uso de RabbitMQ en el proyecto](https://google.com)
- [Acerca del uso de NATS en el proyecto](https://google.com)

## Almacenamiento y procesamiento de datos
Para la recepción y almacenado de los datos se contó con una API RESt basada en NodeJS y una base de datos MongoDB, la instancia donde se ejecutaban estos servicios contaba con modulos capaces de darnos información acerca de los procesos y cantidad de RAM que consumia.

Para conocer más acerca de como se almacenaron y procesaron los datos, dirigete [aquí](https://google.com)

## Analisis y visualización de datos
Para poder visualizar los datos recibos en este proyecto, se dispuso de una aplicación en ReactJS implementada en Google Run de Google Cloud, dicha aplicación no solo muestra distintos datos acerca de los datos recopilados por el flujo de datos de la aplicación sino también nos muestra los recursos que se consumen para poder realizar la captura, almacenamiento y distribución de los datos antes mencionados.

Para conocer más acerca de como se analisan y visualizan los datos, dirigete [aquí](https://google.com)