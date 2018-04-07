package com.mgmtp.screens.config;

import com.mgmtp.screens.filter.JWTAuthorizationFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import static com.mgmtp.screens.constant.SecurityConstants.*;
import static com.mgmtp.screens.constant.VMLocation.*;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurerAdapter() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**").allowedOrigins(LOCAL_URL, DEV_URL, PROD_URL,
                        DEV_FULL_URL, PROD_FULL_URL)
                        .allowedMethods("OPTIONS", "GET", "POST", "PUT", "DELETE").allowCredentials(false)
                        .maxAge(1728000);
            }
        };
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable().cors().and().authorizeRequests()
                .antMatchers("/").permitAll()
                .antMatchers(USER_URL).permitAll()
                .antMatchers(REMOTE_API).permitAll()
                .antMatchers(PUBLIC_SCREENPLAY_URL).permitAll()
                .antMatchers(MARKET_URL).permitAll()
                .antMatchers(MARKET_NAME_URL).permitAll()
                .anyRequest().authenticated()
                .and()
                .addFilter(new JWTAuthorizationFilter(authenticationManager()))
                // this disables session creation on Spring Security
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
    }

}
