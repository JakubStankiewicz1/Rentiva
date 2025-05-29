package com.example.backend.service;

import com.example.backend.dto.CarDTO;
import com.example.backend.entity.Car;
import com.example.backend.exception.CarNotFoundException;
import com.example.backend.mapper.CarMapper;
import com.example.backend.repository.CarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class CarService {

    private final CarRepository carRepository;
    private final CarMapper carMapper;

    @Autowired
    public CarService(CarRepository carRepository, CarMapper carMapper) {
        this.carRepository = carRepository;
        this.carMapper = carMapper;
    }

    /**
     * Get all cars
     */
    @Transactional(readOnly = true)
    public List<CarDTO> getAllCars() {
        List<Car> cars = carRepository.findAll();
        return cars.stream()
                   .map(carMapper::toDTO)
                   .collect(Collectors.toList());
    }

    /**
     * Get car by ID
     */
    @Transactional(readOnly = true)
    public CarDTO getCarById(String id) {
        Car car = carRepository.findById(id)
                              .orElseThrow(() -> new CarNotFoundException("Car not found with id: " + id));
        return carMapper.toDTO(car);
    }

    /**
     * Create new car
     */
    public CarDTO createCar(CarDTO carDTO) {
        if (carDTO.getId() != null && carRepository.existsById(carDTO.getId())) {
            throw new IllegalArgumentException("Car with id " + carDTO.getId() + " already exists");
        }
        
        Car car = carMapper.toEntity(carDTO);
        Car savedCar = carRepository.save(car);
        return carMapper.toDTO(savedCar);
    }

    /**
     * Update existing car
     */
    public CarDTO updateCar(String id, CarDTO carDTO) {
        Car existingCar = carRepository.findById(id)
                                      .orElseThrow(() -> new CarNotFoundException("Car not found with id: " + id));
        
        carMapper.updateEntityFromDTO(existingCar, carDTO);
        Car updatedCar = carRepository.save(existingCar);
        return carMapper.toDTO(updatedCar);
    }

    /**
     * Delete car by ID
     */
    public void deleteCar(String id) {
        if (!carRepository.existsById(id)) {
            throw new CarNotFoundException("Car not found with id: " + id);
        }
        carRepository.deleteById(id);
    }

    /**
     * Get cars by brand
     */
    @Transactional(readOnly = true)
    public List<CarDTO> getCarsByBrand(String brand) {
        List<Car> cars = carRepository.findByBrandIgnoreCase(brand);
        return cars.stream()
                   .map(carMapper::toDTO)
                   .collect(Collectors.toList());
    }

    /**
     * Get cars by type
     */
    @Transactional(readOnly = true)
    public List<CarDTO> getCarsByType(String type) {
        List<Car> cars = carRepository.findByTypeIgnoreCase(type);
        return cars.stream()
                   .map(carMapper::toDTO)
                   .collect(Collectors.toList());
    }

    /**
     * Get cars by brand and type
     */
    @Transactional(readOnly = true)
    public List<CarDTO> getCarsByBrandAndType(String brand, String type) {
        List<Car> cars = carRepository.findByBrandIgnoreCaseAndTypeIgnoreCase(brand, type);
        return cars.stream()
                   .map(carMapper::toDTO)
                   .collect(Collectors.toList());
    }

    /**
     * Get cars with power greater than specified value
     */
    @Transactional(readOnly = true)
    public List<CarDTO> getCarsByMinimumPower(Integer minPower) {
        List<Car> cars = carRepository.findByPowerGreaterThan(minPower);
        return cars.stream()
                   .map(carMapper::toDTO)
                   .collect(Collectors.toList());
    }

    /**
     * Get cars within price range
     */
    @Transactional(readOnly = true)
    public List<CarDTO> getCarsByPriceRange(Integer minPrice, Integer maxPrice) {
        List<Car> cars = carRepository.findByPriceRange(minPrice, maxPrice);
        return cars.stream()
                   .map(carMapper::toDTO)
                   .collect(Collectors.toList());
    }

    /**
     * Search cars by term (title, brand, or model)
     */
    @Transactional(readOnly = true)
    public List<CarDTO> searchCars(String searchTerm) {
        List<Car> cars = carRepository.searchCars(searchTerm);
        return cars.stream()
                   .map(carMapper::toDTO)
                   .collect(Collectors.toList());
    }

    /**
     * Get all cars sorted by price (ascending)
     */
    @Transactional(readOnly = true)
    public List<CarDTO> getAllCarsSortedByPriceAsc() {
        List<Car> cars = carRepository.findAllByOrderByGrossPriceAsc();
        return cars.stream()
                   .map(carMapper::toDTO)
                   .collect(Collectors.toList());
    }

    /**
     * Get all cars sorted by price (descending)
     */
    @Transactional(readOnly = true)
    public List<CarDTO> getAllCarsSortedByPriceDesc() {
        List<Car> cars = carRepository.findAllByOrderByGrossPriceDesc();
        return cars.stream()
                   .map(carMapper::toDTO)
                   .collect(Collectors.toList());
    }

    /**
     * Get all cars sorted by power (descending)
     */
    @Transactional(readOnly = true)
    public List<CarDTO> getAllCarsSortedByPower() {
        List<Car> cars = carRepository.findAllByOrderByPowerDesc();
        return cars.stream()
                   .map(carMapper::toDTO)
                   .collect(Collectors.toList());
    }

    /**
     * Check if car exists
     */
    @Transactional(readOnly = true)
    public boolean carExists(String id) {
        return carRepository.existsById(id);
    }

    /**
     * Get car count
     */
    @Transactional(readOnly = true)
    public long getCarCount() {
        return carRepository.count();
    }
}
