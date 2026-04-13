package com.ecommerce.config;

import com.ecommerce.model.*;
import com.ecommerce.repository.CategoryRepository;
import com.ecommerce.repository.ProductRepository;
import com.ecommerce.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.math.BigDecimal;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initDatabase(UserRepository userRepo, CategoryRepository catRepo,
                                   ProductRepository prodRepo, PasswordEncoder encoder) {
        return args -> {
            // Create admin user
            if (!userRepo.existsByUsername("admin")) {
                userRepo.save(User.builder()
                        .username("admin")
                        .email("admin@ecommerce.com")
                        .password(encoder.encode("admin123"))
                        .fullName("Admin User")
                        .role(Role.ROLE_ADMIN)
                        .build());
            }

            // Create demo user
            if (!userRepo.existsByUsername("user")) {
                userRepo.save(User.builder()
                        .username("user")
                        .email("user@ecommerce.com")
                        .password(encoder.encode("user123"))
                        .fullName("Demo User")
                        .role(Role.ROLE_USER)
                        .build());
            }

            // Create categories
            if (catRepo.count() == 0) {
                Category electronics = catRepo.save(Category.builder()
                        .name("Electronics")
                        .description("Electronic devices and gadgets")
                        .imageUrl("https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400")
                        .build());
                Category clothing = catRepo.save(Category.builder()
                        .name("Clothing")
                        .description("Fashion and apparel")
                        .imageUrl("https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400")
                        .build());
                Category books = catRepo.save(Category.builder()
                        .name("Books")
                        .description("Books and literature")
                        .imageUrl("https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400")
                        .build());
                Category home = catRepo.save(Category.builder()
                        .name("Home & Garden")
                        .description("Home decor and gardening")
                        .imageUrl("https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=400")
                        .build());

                // Create products
                prodRepo.save(Product.builder().name("Wireless Headphones").description("Premium noise-cancelling wireless headphones with 30-hour battery life.").price(new BigDecimal("79.99")).imageUrl("https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400").stockQuantity(50).category(electronics).build());
                prodRepo.save(Product.builder().name("Smartphone Stand").description("Adjustable aluminum smartphone and tablet stand for desk use.").price(new BigDecimal("24.99")).imageUrl("https://images.unsplash.com/photo-1586953208270-767889fa9b0e?w=400").stockQuantity(100).category(electronics).build());
                prodRepo.save(Product.builder().name("USB-C Hub").description("7-in-1 USB-C hub with HDMI, USB 3.0, and SD card reader.").price(new BigDecimal("39.99")).imageUrl("https://images.unsplash.com/photo-1625842268584-8f3296236761?w=400").stockQuantity(75).category(electronics).build());
                prodRepo.save(Product.builder().name("Mechanical Keyboard").description("RGB mechanical keyboard with Cherry MX switches.").price(new BigDecimal("129.99")).imageUrl("https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=400").stockQuantity(30).category(electronics).build());

                prodRepo.save(Product.builder().name("Classic T-Shirt").description("100% cotton classic fit crew neck t-shirt.").price(new BigDecimal("19.99")).imageUrl("https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400").stockQuantity(200).category(clothing).build());
                prodRepo.save(Product.builder().name("Denim Jacket").description("Vintage wash denim jacket with button closure.").price(new BigDecimal("59.99")).imageUrl("https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=400").stockQuantity(40).category(clothing).build());
                prodRepo.save(Product.builder().name("Running Shoes").description("Lightweight breathable running shoes with cushioned sole.").price(new BigDecimal("89.99")).imageUrl("https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400").stockQuantity(60).category(clothing).build());

                prodRepo.save(Product.builder().name("Java Programming").description("Comprehensive guide to Java programming for beginners and experts.").price(new BigDecimal("34.99")).imageUrl("https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400").stockQuantity(80).category(books).build());
                prodRepo.save(Product.builder().name("Spring Boot in Action").description("Learn Spring Boot framework with practical examples.").price(new BigDecimal("44.99")).imageUrl("https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400").stockQuantity(45).category(books).build());

                prodRepo.save(Product.builder().name("Desk Lamp").description("LED desk lamp with adjustable brightness and color temperature.").price(new BigDecimal("29.99")).imageUrl("https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?w=400").stockQuantity(90).category(home).build());
                prodRepo.save(Product.builder().name("Plant Pot Set").description("Set of 3 ceramic plant pots with drainage holes.").price(new BigDecimal("22.99")).imageUrl("https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400").stockQuantity(120).category(home).build());
            }
        };
    }
}
