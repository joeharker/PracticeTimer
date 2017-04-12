/*
 * Copyright (C) 2015 The Android Open Source Project
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// Don't edit this file!  It is auto-generated by frameworks/rs/api/generate.sh.

/*
 * rs_time.rsh: Time Functions and Types
 *
 * The functions below can be used to tell the current clock time and the current
 * system up time.  It is not recommended to call these functions inside of a kernel.
 */

#ifndef RENDERSCRIPT_RS_TIME_RSH
#define RENDERSCRIPT_RS_TIME_RSH

/*
 * rs_time_t: Seconds since January 1, 1970
 *
 * Calendar time interpreted as seconds elapsed since the Epoch (00:00:00 on
 * January 1, 1970, Coordinated Universal Time (UTC)).
 */
#ifndef __LP64__
typedef int rs_time_t;
#endif

#ifdef __LP64__
typedef long rs_time_t;
#endif

/*
 * rs_tm: Date and time structure
 *
 * Data structure for broken-down time components.
 */
typedef struct {
    int tm_sec; // Seconds after the minute. This ranges from 0 to 59, but possibly up to 60 for leap seconds.
    int tm_min; // Minutes after the hour. This ranges from 0 to 59.
    int tm_hour; // Hours past midnight. This ranges from 0 to 23.
    int tm_mday; // Day of the month. This ranges from 1 to 31.
    int tm_mon; // Months since January. This ranges from 0 to 11.
    int tm_year; // Years since 1900.
    int tm_wday; // Days since Sunday. This ranges from 0 to 6.
    int tm_yday; // Days since January 1. This ranges from 0 to 365.
    int tm_isdst; // Flag to indicate whether daylight saving time is in effect. The value is positive if it is in effect, zero if it is not, and negative if the information is not available.
} rs_tm;

/*
 * rsGetDt: Elapsed time since last call
 *
 * Returns the time in seconds since this function was last called in this script.
 *
 * Returns: Time in seconds.
 */
extern float __attribute__((overloadable))
    rsGetDt(void);

/*
 * rsLocaltime: Convert to local time
 *
 * Converts the time specified by timer into a rs_tm structure that provides year, month,
 * hour, etc.  This value is stored at *local.
 *
 * This functions returns the same pointer that is passed as first argument.  If the
 * local parameter is NULL, this function does nothing and returns NULL.
 *
 * Parameters:
 *   local: Pointer to time structure where the local time will be stored.
 *   timer: Input time as a number of seconds since January 1, 1970.
 *
 * Returns: Pointer to the output local time, i.e. the same value as the parameter local.
 */
extern rs_tm* __attribute__((overloadable))
    rsLocaltime(rs_tm* local, const rs_time_t* timer);

/*
 * rsTime: Seconds since January 1, 1970
 *
 * Returns the number of seconds since the Epoch (00:00:00 UTC, January 1, 1970).
 *
 * If timer is non-NULL, the result is also stored in the memory pointed to by
 * this variable.
 *
 * Parameters:
 *   timer: Location to also store the returned calendar time.
 *
 * Returns: Seconds since the Epoch, -1 if there's an error.
 */
extern rs_time_t __attribute__((overloadable))
    rsTime(rs_time_t* timer);

/*
 * rsUptimeMillis: System uptime in milliseconds
 *
 * Returns the current system clock (uptime) in milliseconds.
 *
 * Returns: Uptime in milliseconds.
 */
extern int64_t __attribute__((overloadable))
    rsUptimeMillis(void);

/*
 * rsUptimeNanos: System uptime in nanoseconds
 *
 * Returns the current system clock (uptime) in nanoseconds.
 *
 * The granularity of the values return by this call may be much larger than a nanosecond.
 *
 * Returns: Uptime in nanoseconds.
 */
extern int64_t __attribute__((overloadable))
    rsUptimeNanos(void);

#endif // RENDERSCRIPT_RS_TIME_RSH
