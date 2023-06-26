package com.lantern_business_webapp.configuration;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.CacheManager;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class StartupListener implements ApplicationListener<ContextRefreshedEvent> {
    private final CacheManager cacheManager;

    @Override
    public final void onApplicationEvent(ContextRefreshedEvent event) {
        System.out.println("On Application Event is OK");
        // cacheManager.getCache(n).clear()
        cacheManager.getCacheNames().parallelStream().forEach(System.out::println);
    }

}