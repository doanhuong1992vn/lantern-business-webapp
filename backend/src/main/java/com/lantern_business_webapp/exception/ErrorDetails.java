package com.lantern_business_webapp.exception;

import java.util.Date;


public record ErrorDetails(Date timestamp, String message, String details) {
}
