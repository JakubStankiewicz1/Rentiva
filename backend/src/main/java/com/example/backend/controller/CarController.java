package com.example.backend.controller;

import com.example.backend.dto.CarDTO;
import com.example.backend.service.CarService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cars")
public class CarController {

    private final CarService carService;

    @Autowired
    public CarController(CarService carService) {
        this.carService = carService;
    }

    /**
     * GET /api/cars - Get all cars
     */
    @GetMapping
    public ResponseEntity<List<CarDTO>> getAllCars(
            @RequestParam(value = "brand", required = false) String brand,
            @RequestParam(value = "type", required = false) String type,
            @RequestParam(value = "minPower", required = false) Integer minPower,
            @RequestParam(value = "minPrice", required = false) Integer minPrice,
            @RequestParam(value = "maxPrice", required = false) Integer maxPrice,
            @RequestParam(value = "search", required = false) String search,
            @RequestParam(value = "sortBy", required = false) String sortBy) {

        List<CarDTO> cars;

        // Handle search query
        if (search != null && !search.trim().isEmpty()) {
            cars = carService.searchCars(search.trim());
        }
        // Handle filtering by brand and type
        else if (brand != null && type != null) {
            cars = carService.getCarsByBrandAndType(brand, type);
        }
        // Handle filtering by brand only
        else if (brand != null) {
            cars = carService.getCarsByBrand(brand);
        }
        // Handle filtering by type only
        else if (type != null) {
            cars = carService.getCarsByType(type);
        }
        // Handle filtering by minimum power
        else if (minPower != null) {
            cars = carService.getCarsByMinimumPower(minPower);
        }
        // Handle filtering by price range
        else if (minPrice != null && maxPrice != null) {
            cars = carService.getCarsByPriceRange(minPrice, maxPrice);
        }
        // Handle sorting
        else if ("price-asc".equals(sortBy)) {
            cars = carService.getAllCarsSortedByPriceAsc();
        }
        else if ("price-desc".equals(sortBy)) {
            cars = carService.getAllCarsSortedByPriceDesc();
        }
        else if ("power".equals(sortBy)) {
            cars = carService.getAllCarsSortedByPower();
        }
        // Default: get all cars
        else {
            cars = carService.getAllCars();
        }

        return ResponseEntity.ok(cars);
    }

    /**
     * GET /api/cars/{id} - Get car by ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<CarDTO> getCarById(@PathVariable String id) {
        CarDTO car = carService.getCarById(id);
        return ResponseEntity.ok(car);
    }

    /**
     * POST /api/cars - Create new car
     */
    @PostMapping
    public ResponseEntity<CarDTO> createCar(@Valid @RequestBody CarDTO carDTO) {
        CarDTO createdCar = carService.createCar(carDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdCar);
    }

    /**
     * PUT /api/cars/{id} - Update existing car
     */
    @PutMapping("/{id}")
    public ResponseEntity<CarDTO> updateCar(@PathVariable String id, @Valid @RequestBody CarDTO carDTO) {
        CarDTO updatedCar = carService.updateCar(id, carDTO);
        return ResponseEntity.ok(updatedCar);
    }

    /**
     * DELETE /api/cars/{id} - Delete car by ID
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCar(@PathVariable String id) {
        carService.deleteCar(id);
        return ResponseEntity.noContent().build();
    }

    /**
     * GET /api/cars/brands/{brand} - Get cars by brand
     */
    @GetMapping("/brands/{brand}")
    public ResponseEntity<List<CarDTO>> getCarsByBrand(@PathVariable String brand) {
        List<CarDTO> cars = carService.getCarsByBrand(brand);
        return ResponseEntity.ok(cars);
    }

    /**
     * GET /api/cars/types/{type} - Get cars by type
     */
    @GetMapping("/types/{type}")
    public ResponseEntity<List<CarDTO>> getCarsByType(@PathVariable String type) {
        List<CarDTO> cars = carService.getCarsByType(type);
        return ResponseEntity.ok(cars);
    }

    /**
     * GET /api/cars/search?q={searchTerm} - Search cars
     */
    @GetMapping("/search")
    public ResponseEntity<List<CarDTO>> searchCars(@RequestParam("q") String searchTerm) {
        List<CarDTO> cars = carService.searchCars(searchTerm);
        return ResponseEntity.ok(cars);
    }

    /**
     * GET /api/cars/count - Get total car count
     */
    @GetMapping("/count")
    public ResponseEntity<Long> getCarCount() {
        long count = carService.getCarCount();
        return ResponseEntity.ok(count);
    }

    /**
     * GET /api/cars/exists/{id} - Check if car exists
     */
    @GetMapping("/exists/{id}")
    public ResponseEntity<Boolean> carExists(@PathVariable String id) {
        boolean exists = carService.carExists(id);
        return ResponseEntity.ok(exists);
    }

    /**
     * GET /api/cars/filter/power/{minPower} - Get cars with minimum power
     */
    @GetMapping("/filter/power/{minPower}")
    public ResponseEntity<List<CarDTO>> getCarsByMinimumPower(@PathVariable Integer minPower) {
        List<CarDTO> cars = carService.getCarsByMinimumPower(minPower);
        return ResponseEntity.ok(cars);
    }

    /**
     * GET /api/cars/filter/price?min={minPrice}&max={maxPrice} - Get cars within price range
     */
    @GetMapping("/filter/price")
    public ResponseEntity<List<CarDTO>> getCarsByPriceRange(
            @RequestParam("min") Integer minPrice, 
            @RequestParam("max") Integer maxPrice) {
        List<CarDTO> cars = carService.getCarsByPriceRange(minPrice, maxPrice);
        return ResponseEntity.ok(cars);
    }
}
