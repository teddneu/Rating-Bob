FROM eclipse-temurin:21-jdk-alpine AS build

WORKDIR /app

COPY . .
RUN set -eux; \
    if [ -f mvnw ]; then PROJECT_DIR=/app; \
    elif [ -f service.ratings/service.ratings/mvnw ]; then PROJECT_DIR=/app/service.ratings/service.ratings; \
    else echo "Cannot find mvnw in build context" >&2; find /app -maxdepth 4 -name mvnw -o -name pom.xml; exit 1; fi; \
    sed -i 's/\r$//' "$PROJECT_DIR/mvnw"; \
    chmod +x "$PROJECT_DIR/mvnw"; \
    cd "$PROJECT_DIR"; \
    ./mvnw clean package -DskipTests; \
    mkdir -p /app/output; \
    cp target/service.ratings-0.0.1-SNAPSHOT.jar /app/output/app.jar

FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

COPY --from=build /app/output/app.jar app.jar

ENV PORT=10000
EXPOSE 10000

CMD ["sh", "-c", "java -jar /app/app.jar --server.port=${PORT:-10000}"]
