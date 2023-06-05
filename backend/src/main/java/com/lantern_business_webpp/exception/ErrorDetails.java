package com.lantern_business_webpp.exception;

import java.util.Date;


public record ErrorDetails(Date timestamp, String message, String details) {
}
