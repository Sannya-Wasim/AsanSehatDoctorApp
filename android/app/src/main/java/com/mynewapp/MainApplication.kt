package com.mynewapp

import android.app.Application
import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import com.facebook.react.ReactHost
import com.facebook.react.defaults.DefaultReactHost.getDefaultReactHost
import com.facebook.react.ReactNativeApplicationEntryPoint.loadReactNative
import com.oney.WebRTCModule.WebRTCModuleOptions

class MainApplication : Application(), ReactApplication {

    // Lazy reactHost initialization
    override val reactHost: ReactHost by lazy {
        getDefaultReactHost(
            context = applicationContext,
            packageList = PackageList(this).packages.apply {
                // Manually add packages that cannot be autolinked
            }
        )
    }

    override fun onCreate() {
        super.onCreate()
        loadReactNative(this)

        // ✅ Enable screen sharing
        val options = WebRTCModuleOptions.getInstance()
        options.enableMediaProjectionService = true
    }
}
