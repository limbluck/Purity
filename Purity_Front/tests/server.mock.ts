import { setupServer } from 'msw/node';
import { HttpResponse, http } from 'msw';

const handlers = [
    http.get('http://limbluck-purity.mooo.com/server/api/Blogs/thumbnails/:amount([0-9]+)rnd', ({ params })=>{

        return HttpResponse.json({
            success: true,
            data: 'requested ' + params.amount + ' blogs'
          });
    }),
    http.get('http://limbluck-purity.mooo.com/server/api/Courses/thumbnails/:amount([0-9]+)rnd', ({ params })=>{

        return HttpResponse.json({
            success: true,
            data: 'requested ' + params.amount + ' courses'
          });
    })
];

const server = setupServer(...handlers);
export default server;