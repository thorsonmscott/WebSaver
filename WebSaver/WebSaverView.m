//
//  WebSaverView.m
//  WebSaver
//
//  Created by Max Thorson on 1/5/16.
//  Copyright © 2016 Max Thorson. All rights reserved.
//

#import "WebSaverView.h"

@implementation WebSaverView

static NSString * const WebScreenSaverModuleName = @"com.thorsonmscott.WebSaver";

- (instancetype)initWithFrame:(NSRect)frame isPreview:(BOOL)isPreview
{
    self = [super initWithFrame:frame isPreview:isPreview];
    if (self) {
        [self setAnimationTimeInterval:1/30.0];
        
        ScreenSaverDefaults *defaults;
        defaults = [ScreenSaverDefaults defaultsForModuleWithName:WebScreenSaverModuleName];
        
        [defaults registerDefaults:[NSDictionary dictionaryWithObjectsAndKeys:@"", @"url", nil]];
        
        NSString *indexURL = [[NSURL fileURLWithPath:[[NSBundle bundleForClass:self.class].resourcePath stringByAppendingString:@"/app/index.html"] isDirectory:NO] description];
        
        if (self.isPreview) {
            indexURL = [indexURL stringByAppendingString:@"&preview=true"];
        }
        
        webView = [[WebView alloc] initWithFrame:[self bounds]];
        [webView setFrameLoadDelegate:self];
        [webView setDrawsBackground:NO];
        [webView.mainFrame loadRequest:[NSURLRequest requestWithURL:[NSURL URLWithString:indexURL] cachePolicy:NSURLRequestUseProtocolCachePolicy timeoutInterval:30.0]];
        
        [self addSubview:webView];
    }
    return self;
}

- (void)startAnimation
{
    [super startAnimation];
}

- (void)stopAnimation
{
    [super stopAnimation];
}

- (void)drawRect:(NSRect)rect
{
    [super drawRect:rect];
}

- (void)animateOneFrame
{
    return;
}

- (BOOL)hasConfigureSheet
{
    return NO;
}

- (NSWindow*)configureSheet
{
    return nil;
}

@end
