package com.react_native_firebase_facebook_login;
import com.facebook.react.ReactActivity;
import android.content.Intent;
import com.facebook.CallbackManager;

public class MainActivity extends ReactActivity {
  CallbackManager mCallbackManager =
    MainApplication.getCallbackManager();

  /**
   * Returns the name of the main component registered from JavaScript.
   * This is used to schedule rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
      return "react_native_firebase_facebook_login";
  }

  @Override
  public void onActivityResult(int requestCode, int resultCode, Intent data) {
    super.onActivityResult(requestCode, resultCode, data);
    mCallbackManager.onActivityResult(requestCode, resultCode, data);
  }

}
