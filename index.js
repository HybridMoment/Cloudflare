class LinksTransformer{
  constructor(links){
    this.links = links
  }

  async element(element){
    const attributeId = element.getAttribute("id")
    if (attributeId === 'links') {
        for( let i = 0; i < this.links.length; i++) {
          let linkUrl = this.links[i].url
          let linkName = this.links[i].name
          element.append(`<a href=${linkUrl}>${linkName}</a>`, {html:true})
        }  
    }else if (attributeId === 'profile') {
        element.removeAttribute('style')
    }else if (attributeId === 'avatar') {
        element.setAttribute('src', 'https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-1/c0.119.480.480a/p480x480/49204724_2065801416828985_3102414633504342016_o.jpg?_nc_cat=102&ccb=2&_nc_sid=7206a8&_nc_ohc=JDT_v3RXUOgAX-IRaBC&_nc_ht=scontent-lga3-1.xx&tp=27&oh=8b34a1d8351fa2c07120abb4adcfa925&oe=5FC10F3D')
    }else if (attributeId === 'name') {
        element.setInnerContent('HybridMoment')
    }else if (attributeId === 'social') {
        element.removeAttribute('style')
        element.append('<a href=https://github.com/HybridMoment><svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>GitHub icon</title><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg></a>', {html:true})
    }else if (element.tagName === 'title') {
        element.setInnerContent('Eric Rogers')
    }else if (element.tagName === 'body') {
        element.setAttribute('class', 'bg-indigo-400')
    } 

  }
}

const json = [{"name":"Favorite Song", "url": "https://youtu.be/wpuHOkPeGJ8"},
            {"name":"PFW guide", "url": "https://pfw.guide/"},
            {"name":"Go Vote!", "url": "https://www.google.com/search?q=where+do+I+vote+%23election2020&oi=ddle&ct=170241145&hl=en&source=doodle-ntp&ved=0ahUKEwj1m6SNz-TsAhUwlnIEHbn5Au4QPQgB#eob=va/4/16/"}]

addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)
  const path = url.pathname

  if (path === '/links') {
    return new Response( json , {
      headers: { 'content-type': 'application/json;charset=UTF-8' },
    });

  } else {
    //return static HTML page
    const init = {
      headers: {
        "content-type": "text/html;charset=UTF-8",
      },
    }
    const URL = 'https://static-links-page.signalnerve.workers.dev'
    const response  = await fetch(URL,init)
    const rewriter = new HTMLRewriter()
      .on("div", new LinksTransformer(json))
      .on("img", new LinksTransformer())
      .on("h1", new LinksTransformer())
      .on("title", new LinksTransformer())
      .on("body", new LinksTransformer())
    return rewriter.transform(response)
  }
  
}

