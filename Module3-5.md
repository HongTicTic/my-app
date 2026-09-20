WindowWidth: the cleanup stops the resize listener from surviving after the component unmounts, which would leak memory and call setWidth on an unmounted component.

UserDirectory: the cleanup stops a late response from setting state after the user has left the page.

UserDetail: the cleanup stops a slow response for the previous id from overwriting the page for the current id (the race condition).