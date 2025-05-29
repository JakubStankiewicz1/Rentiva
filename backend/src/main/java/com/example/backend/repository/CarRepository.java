package com.example.backend.repository;

import com.example.backend.entity.Car;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CarRepository extends JpaRepository<Car, String> {

    // Find cars by brand
    List<Car> findByBrandIgnoreCase(String brand);

    // Find cars by type
    List<Car> findByTypeIgnoreCase(String type);

    // Find cars by brand and type
    List<Car> findByBrandIgnoreCaseAndTypeIgnoreCase(String brand, String type);

    // Find cars with power greater than specified value
    List<Car> findByPowerGreaterThan(Integer power);

    // Find cars with price range
    @Query("SELECT c FROM Car c WHERE c.grossPrice BETWEEN :minPrice AND :maxPrice")
    List<Car> findByPriceRange(@Param("minPrice") Integer minPrice, @Param("maxPrice") Integer maxPrice);

    // Search cars by title, brand, or model (case insensitive)
    @Query("SELECT c FROM Car c WHERE " +
           "LOWER(c.title) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(c.brand) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(c.model) LIKE LOWER(CONCAT('%', :searchTerm, '%'))")
    List<Car> searchCars(@Param("searchTerm") String searchTerm);

    // Find cars ordered by price (ascending)
    List<Car> findAllByOrderByGrossPriceAsc();

    // Find cars ordered by price (descending)
    List<Car> findAllByOrderByGrossPriceDesc();

    // Find cars ordered by power (descending)
    List<Car> findAllByOrderByPowerDesc();

    // Check if car exists by id
    boolean existsById(String id);
}
