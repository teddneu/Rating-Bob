FROM eclipse-temurin:21-jdk-alpine AS build

WORKDIR /app

COPY service.ratings/service.ratings/mvnw ./mvnw
COPY service.ratings/service.ratings/mvnw.cmd ./mvnw.cmd
COPY service.ratings/service.ratings/.mvn ./.mvn
COPY service.ratings/service.ratings/pom.xml ./pom.xml
COPY service.ratings/service.ratings/src ./src
COPY service.ratings/service.ratings/HELP.md ./HELP.md

RUN sed -i 's/\r$//' mvnw && chmod +x mvnw
RUN ./mvnw clean package -DskipTests

FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

COPY --from=build /app/target/service.ratings-0.0.1-SNAPSHOT.jar app.jar

ENV PORT=10000
EXPOSE 10000

CMD ["sh", "-c", "java -jar /app/app.jar --server.port=${PORT:-10000}"]
