package com.lantern_business_webpp.service.impl;


import com.lantern_business_webpp.entity.Role;
import com.lantern_business_webpp.entity.User;
import com.lantern_business_webpp.exception.DuplicateFieldUserException;
import com.lantern_business_webpp.payload.request.RegisterRequestDTO;
import com.lantern_business_webpp.payload.response.UserResponseDto;
import com.lantern_business_webpp.repository.RoleRepository;
import com.lantern_business_webpp.repository.UserRepository;
import com.lantern_business_webpp.service.UserService;
import javax.transaction.Transactional;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final ModelMapper modelMapper;

    @Override
    public Iterable<UserResponseDto> findAll() {
        Iterable<User> entities = userRepository.findAll();
        return StreamSupport.stream(entities.spliterator(), true)
                .map(entity -> modelMapper.map(entity, UserResponseDto.class))
                .collect(Collectors.toList());
    }

    @Override
    public Optional<UserResponseDto> findById(Long id) {
        Optional<User> user = userRepository.findById(id);
        return Optional.ofNullable(modelMapper.map(user, UserResponseDto.class));
    }

    @Override
    public void save(UserResponseDto userResponseDto) {
        User user = modelMapper.map(userResponseDto, User.class);
        if (!userResponseDto.getPassword().isEmpty()) {
            String hashedPassword = BCrypt.hashpw(userResponseDto.getPassword(), BCrypt.gensalt(10));
            user.setPassword(hashedPassword);
        }
        user.setPhone("0" + user.getPhone()
                .substring(user.getPhone().length() - 9));
        user.setActive(true);
        userRepository.save(user);
    }

    @Override
    public User save(RegisterRequestDTO registerRequestDTO) throws DuplicateFieldUserException {
        if (userRepository.existsByUsername(registerRequestDTO.getUsername())) {
            throw new DuplicateFieldUserException(String.format(
                    "Username %s already exists!", registerRequestDTO.getUsername()));
        }
        if (userRepository.existsByEmail(registerRequestDTO.getEmail())) {
            throw new DuplicateFieldUserException(String.format(
                    "Email %s already exists!", registerRequestDTO.getEmail()));
        }
        final String phone = registerRequestDTO.getPhone()
                .substring(registerRequestDTO.getPhone().length() - 9);
        if (userRepository.existsByPhoneContaining(phone)) {
            throw new DuplicateFieldUserException(String.format(
                    "Phone number %s already exists!", registerRequestDTO.getPhone()));
        }
        User user = modelMapper.map(registerRequestDTO, User.class);
        if (!registerRequestDTO.getPassword().isEmpty()) {
            String hashedPassword = BCrypt.hashpw(registerRequestDTO.getPassword(), BCrypt.gensalt(10));
            user.setPassword(hashedPassword);
        }
        user.setActive(true);
        Role roleCustomer = roleRepository.findByName("ROLE_CUSTOMER");
        Set<Role> roles = new HashSet<>(List.of(new Role[]{roleCustomer}));
        user.setRoles(roles);
        return userRepository.save(user);
    }

    @Override
    public boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }

    @Override
    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    @Override
    public boolean existsByPhone(String phone) {
        return userRepository.existsByPhoneContaining(phone);
    }

    @Override
    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }
    @Override
    public boolean existsByFieldAndData(String field, String data) {
        switch (field) {
            case "username" -> {
                return userRepository.existsByUsername(data);
            }
            case "email" -> {
                return userRepository.existsByEmail(data);
            }
            case "phone" -> {
                return userRepository.existsByPhoneContaining(data);
            }
            default -> {
                return false;
            }
        }
    }

    @Override
    public void remove(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public List<UserResponseDto> getUsers() {
        List<User> users = userRepository.findAll();
        return users.stream()
                .map(user -> modelMapper.map(user, UserResponseDto.class))
                .collect(Collectors.toList());
    }

    @Override
    public List<UserResponseDto> getUsersByFullName(String fullName) {
        String likeFullName = "%" + fullName + "%";
        List<User> users = userRepository.findByFullName(likeFullName);
        return users.stream()
                .map(user -> modelMapper.map(user, UserResponseDto.class))
                .collect(Collectors.toList());
    }

    @Override
    public UserResponseDto getUserById(Long userId) {
        User user = userRepository.findById(userId).orElse(null);
        return modelMapper.map(user, UserResponseDto.class);
    }
}