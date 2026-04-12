# Sử dụng JDK 21
FROM eclipse-temurin:21-jdk-alpine

WORKDIR /app

# Copy file cấu hình maven trước để cache layer (tối ưu tốc độ build)
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

# Fix lỗi "not found" bằng cách chuyển đổi định dạng xuống dòng và cấp quyền
RUN tr -d '\r' < mvnw > mvnw_unix && mv mvnw_unix mvnw
RUN chmod +x mvnw

# Copy toàn bộ source code
COPY src src

# Build dự án
RUN ./mvnw clean install -DskipTests

# Chạy file jar
# Teddy lưu ý: Hãy chắc chắn tên file .jar trong target/ là đúng nhé
CMD ["java", "-jar", "target/service.ratings-0.0.1-SNAPSHOT.jar"]