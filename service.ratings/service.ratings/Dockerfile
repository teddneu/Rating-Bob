FROM eclipse-temurin:21-jdk-alpine
WORKDIR /app

# Copy toàn bộ nội dung trong thư mục hiện tại (Root Directory) vào Docker
COPY . .

# Xử lý file mvnw: xóa ký tự lạ và cấp quyền
RUN tr -d '\r' < mvnw > mvnw_unix && mv mvnw_unix mvnw
RUN chmod +x mvnw

# Build dự án (bỏ qua Test cho nhanh)
RUN ./mvnw clean install -DskipTests

# Chạy file jar
# Teddy kiểm tra: nếu build xong nó ra file tên khác thì sửa tên này nhé
CMD ["java", "-jar", "target/service.ratings-0.0.1-SNAPSHOT.jar"]