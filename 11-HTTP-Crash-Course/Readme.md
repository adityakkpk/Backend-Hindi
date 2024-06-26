## HTTP Crash Course
HTTP standa for Hyper Text Transfer Protocol
URL/URI stands for Universal Resourse Locator/Identifier

### What are HTTP Header?
- When we send an HTTP request, we have to send some extra information to the server. This extra information is known as metadata. `Metadata` is data about the data. 

- This metadatas is known as `HTTP Headers`.

- `Request` and `Response` headers also contain `metadatas`.

- Some usages of HTTP Headers are: `caching`, `authentication`, `manage satate` etc.

- **Some types of headers**:
    - `Request Headers` -> from Client
    - `Response Headers` -> from Server
    - `Representation Headers` -> encoding / compression
    - `Payload Headers` -> data

- **Most Common Headers**:
    - `Accept` : application/json
    - `User Agent`
    - `Authorization`
    - `Content-Type`
    - `Cookie`
    - `Cache-Control`

- **CORS headers**:
    - `Access-Control-Allow-Origin`
    - `Access-Control-Allow-Credentials`
    - `Access-Control-Allow-Methods`

- **Security headers**:
    - `Cross-origin-embedder-policy`
    - `Cross-origin-open-policy`
    - `Content-Security-Policy`
    - `X-XSS-Protection
    
### HTTP Methods
Basic set of opertations that can be used to interect with server.
- **GET** : retrive a server
- **Head** : No message body (response headers only)
- **OPTIONS** : what operations are available
- **TRACE** : loopback test (get some data)
- **DELETE** : remove a resource
- **PUT** : replace a resource
- **POST** : interect with resource (mostly add)
- **PATCH** : change part of a resource

### Status Code
- **1xx** : Information
- **2xx** : Sucess
- **3xx** : Redirection
- **4xx** : Client error
- **5xx** : Server error

*100* : Continue
*102* : Processing
*200* : Ok
*201* : Created
*202* : accepted
*307* : temporary redirect
*308* : permanent redirect
*400* : Bad request
*401* : Unauthorized
*402* : Payment Required
*404* : Not Found
*500* : Internal Server Error
*504* : Gateway timeout