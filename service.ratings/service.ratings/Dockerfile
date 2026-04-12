FROM eclipse-temurin:21-jdk-alpine

WORKDIR /app

# Copy toàn bộ dự án vào Docker
COPY . .

# Di chuyển vào thư mục chứa code backend thực sự
WORKDIR /app/service.ratings/service.ratings

# Xử lý file mvnw (lúc này chắc chắn tìm thấy vì đang đứng đúng chỗ)
RUN tr -d '\r' < mvnw > mvnw_unix && mv mvnw_unix mvnw
RUN chmod +x mvnw

# Build dự án
RUN ./mvnw clean install -DskipTests

# Chạy file jar
# Lưu ý: Cổng Render mặc định là 10000, Spring Boot nên nhận biến PORT này
ENV PORT=10000
EXPOSE 10000

CMD ["java", "-jar", "target/service.ratings-0.0.1-SNAPSHOT.jar"]