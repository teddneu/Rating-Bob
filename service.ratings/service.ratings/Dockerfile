FROM eclipse-temurin:21-jdk-alpine AS build

WORKDIR /app

# Copy source vào đúng thư mục project gốc của backend
COPY . .

# Chuẩn hóa line ending của Maven wrapper và build jar
RUN sed -i 's/\r$//' mvnw && chmod +x mvnw
RUN ./mvnw clean package -DskipTests

FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

COPY --from=build /app/target/service.ratings-0.0.1-SNAPSHOT.jar app.jar

ENV PORT=10000
EXPOSE 10000

ENTRYPOINT ["sh", "-c", "java -jar /app/app.jar --server.port=${PORT:-10000}"]
