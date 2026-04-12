# Sử dụng JDK 21
FROM eclipse-temurin:21-jdk-alpine

WORKDIR /app

# Copy toàn bộ dự án từ thư mục gốc vào Docker
COPY . .

# Di chuyển hẳn vào thư mục backend nơi có file mvnw
WORKDIR /app/service.ratings/service.ratings

# Tẩy sạch ký tự Windows và cấp quyền chạy
RUN tr -d '\r' < mvnw > mvnw_unix && mv mvnw_unix mvnw
RUN chmod +x mvnw

# Chạy lệnh build của Maven
RUN ./mvnw clean install -DskipTests

# Cấu hình cổng cho Render
ENV PORT=10000
EXPOSE 10000

# Chạy file Jar
CMD ["java", "-jar", "target/service.ratings-0.0.1-SNAPSHOT.jar"]