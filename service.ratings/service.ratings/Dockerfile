FROM eclipse-temurin:21-jdk-alpine
WORKDIR /app
COPY . .
RUN ./mvnw clean install -DskipTests
CMD ["java", "-jar", "target/service.ratings-0.0.1-SNAPSHOT.jar"]