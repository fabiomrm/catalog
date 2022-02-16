package com.fmrm.catalog.resources;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentMatchers;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fmrm.catalog.dto.ProductDTO;
import com.fmrm.catalog.services.ProductService;
import com.fmrm.catalog.services.exceptions.ResourceNotFoundException;
import com.fmrm.catalog.tests.Factory;

@WebMvcTest(ProductResource.class)
public class ProductResourceTests {

	@Autowired
	private MockMvc mockMvc;
	
	@MockBean
	private ProductService service;
	
	@Autowired
	private ObjectMapper objectMapper;
	
	private Long existingId;
	private Long nonExistingId;
	private ProductDTO productDTO;
	private PageImpl<ProductDTO> page;
	
	@BeforeEach
	void setUp() throws Exception {
		
		existingId = 1L;
		nonExistingId = 2L;
		
		productDTO = Factory.createProductDTO();
		page = new PageImpl<>(List.of(productDTO));
		
		Mockito.when(service.update(eq(existingId), any())).thenReturn(productDTO);
		Mockito.when(service.update(eq(nonExistingId), any())).thenThrow(ResourceNotFoundException.class);
		
		Mockito.when(service.findAllPaged(ArgumentMatchers.any())).thenReturn(page);
		
		Mockito.when(service.findById(existingId)).thenReturn(productDTO);
		Mockito.when(service.findById(nonExistingId)).thenThrow(ResourceNotFoundException.class);
	}
	
	@Test
	public void updateShouldReturnNotFoundWhenIdDoesNotExist() throws Exception {
		
		String jsonBody = objectMapper.writeValueAsString(productDTO);
		
		ResultActions result = 
				mockMvc.perform(put("/products/{id}", nonExistingId)
						.content(jsonBody)
						.contentType(MediaType.APPLICATION_JSON)
						.accept(MediaType.APPLICATION_JSON));
		
		result.andExpect(status().isNotFound());
	}
	
	@Test
	public void updateShouldReturnProductDTOWhenIdExists() throws Exception {
		
		String jsonBody = objectMapper.writeValueAsString(productDTO);
		
		ResultActions result = 
				mockMvc.perform(put("/products/{id}", existingId)
						.content(jsonBody)
						.contentType(MediaType.APPLICATION_JSON)
						.accept(MediaType.APPLICATION_JSON));
		
		result.andExpect(status().isOk());
		result.andExpect(jsonPath("$.id").exists());
		result.andExpect(jsonPath("$.name").exists());
		result.andExpect(jsonPath("$.description").exists());
	}
	
	@Test
	public void findByIdShouldReturnProductDTOWhenIdExists() throws Exception{
		
		ResultActions result = 
				mockMvc.perform(get("/products/{id}", existingId)
						.accept(MediaType.APPLICATION_JSON));
		
		result.andExpect(status().isOk());
		result.andExpect(jsonPath("$.id").exists());
		result.andExpect(jsonPath("$.name").exists());
		result.andExpect(jsonPath("$.description").exists());
		
	}
	
	@Test
	public void findByIdShouldReturnNotFoundWhenProductDTOWhenIdDoesNotExist() throws Exception {
		ResultActions result = 
				mockMvc.perform(get("/products/{id}", nonExistingId)
						.accept(MediaType.APPLICATION_JSON));
		result.andExpect(status().isNotFound());
	}
	
	@Test
	public void findAllShouldReturnPage() throws Exception {
		ResultActions result = 
				mockMvc.perform(get("/products")
				.accept(MediaType.APPLICATION_JSON));
		
		result.andExpect(status().isOk());
	}
}
