//
//  WebSaverView.h
//  WebSaver
//
//  Created by Max Thorson on 1/5/16.
//  Copyright © 2016 Max Thorson. All rights reserved.
//

#import <ScreenSaver/ScreenSaver.h>
#import <WebKit/WebKit.h>

@interface WebSaverView : ScreenSaverView <WebFrameLoadDelegate> {
    IBOutlet id configSheet;
    
    WebView *webView;
}

@end
