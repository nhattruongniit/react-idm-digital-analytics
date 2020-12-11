import request from 'services/request';
import collaborationApi from "services/collaboration-api"

export async function fetchGeometries(documentId) {
  return collaborationApi.getGeometries(documentId);
}

export function createGeometries(documentId, objects) {
  return collaborationApi.createGeometries(documentId, objects);
}

export function deleteGeometries(documentId, ids) {
  return collaborationApi.deleteGeometries(documentId, ids);
}

export function updateGeometries(documentId, objects) {
  return collaborationApi.updateGeometries(documentId, objects);
}

export async function applyTemplate(documentId, ids){
  const idf_document = (await request(`/idf-documents/${documentId}`)).data.data
  
  if(idf_document.template_id){
    const idf_objects = (await request.post(`/idf-documents/${documentId}/get-objects-by-id`, {ids})).data.data
    const template_objects = (await request.post(`/templates/${idf_document.template_id}/apply`, {
      objects: idf_objects
    })).data.data


    const to_add =[]
    const to_update = []

    template_objects.forEach( obj => {
      if(obj.id) to_update.push(obj)
      else to_add.push(obj)
    })

    if(to_add.length){
      await request.post(`/idf-documents/${documentId}/add-objects`, {
        objects: to_add
      })
    }

    if(to_update.length){
      await (Promise.all(
        to_update.map( obj => new Promise( async (done, error) => {
          try{
            await request.put(`/idf-documents/${documentId}/classes/${obj.class_name}/objects/${obj.id}`, obj)
            done()
          }
          catch(e) { error(e) }
        } ) )
      ))
    }

  }
  


}
