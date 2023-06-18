package com.lantern_business_webapp.logger;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;

@Aspect
@Configuration
public class ControllerLogger {
    private static final Logger LOGGER = LogManager.getLogger(ControllerLogger.class);

    @Before("execution(public * com.lantern_business_webapp.controller.*.*(..))")
    public void logBefore(JoinPoint joinPoint) {
        LOGGER.info(String.format("Before method: %s.%s()   ...running...",
                joinPoint.getTarget().getClass().getName(),
                joinPoint.getSignature().getName()));
    }

    @After("execution(public * com.lantern_business_webapp.controller.*.*(..))")
    public void logAfter(JoinPoint joinPoint) {
        LOGGER.info(String.format("After method: %s.%s()    ...success...",
                joinPoint.getTarget().getClass().getName(),
                joinPoint.getSignature().getName()));
    }

    @AfterThrowing(value = "execution(public * com.lantern_business_webapp.controller.*.*(..))", throwing = "error")
    public void logThrow(JoinPoint joinPoint, Throwable error) {
        LOGGER.warn(String.format("...EXCEPTION IN METHOD... : %s.%s()  ...FAIL...  ...ARGS: %s...",
                joinPoint.getTarget().getClass().getName(),
                joinPoint.getSignature().getName(),
                Arrays.toString(joinPoint.getArgs())));
        LOGGER.error("...EXCEPTION IS... : " + error);
    }
}
