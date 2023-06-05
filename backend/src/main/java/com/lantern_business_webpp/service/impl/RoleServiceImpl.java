package com.lantern_business_webpp.service.impl;


import com.lantern_business_webpp.entity.Role;
import com.lantern_business_webpp.payload.response.RoleResponseDto;
import com.lantern_business_webpp.repository.RoleRepository;
import com.lantern_business_webpp.service.RoleService;
import javax.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
@Transactional
@ComponentScan(basePackageClasses = ModelMapper.class)
public class RoleServiceImpl implements RoleService {
    private final RoleRepository roleRepository;

    private final ModelMapper modelMapper;

    public RoleServiceImpl(RoleRepository roleRepository, ModelMapper modelMapper) {
        this.roleRepository = roleRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public Iterable<RoleResponseDto> findAll() {
        Iterable<Role> entities = roleRepository.findAll();
        return StreamSupport.stream(entities.spliterator(), true)
                            .map(entity -> modelMapper.map(entity, RoleResponseDto.class))
                            .collect(Collectors.toList());
    }

    @Override
    public Optional<RoleResponseDto> findById(Long id) {
        Role entity = roleRepository.findById(id).orElse(null);
        return Optional.ofNullable(modelMapper.map(entity, RoleResponseDto.class));
    }

    @Override
    public void save(RoleResponseDto roleResponseDto) {
        Role role = modelMapper.map(roleResponseDto, Role.class);
        roleRepository.save(role);
    }

    @Override
    public void remove(Long id) {
        roleRepository.deleteById(id);
    }
}
