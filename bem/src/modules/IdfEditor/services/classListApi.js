import collaborationApi from "services/collaboration-api"

export const fetchClassList = (documentId) => {
  return collaborationApi.getClasses(documentId);
}

export const fetchObjectCount = documentId => {
  return collaborationApi.getDocumentObjectsStats(documentId);
}

export const fetchClassData = (documentId, className) => {
  return collaborationApi.getClass(documentId, className);
}

export const fetctIdfObjectList = (documentId, className, pageNumber, itemsPerPage) => {
  return collaborationApi.getObjects(documentId, className, {
      page: pageNumber,
      per_page: itemsPerPage,
  });
}

export const fetctIdfObjectListByCategory = (documentId, className, categoryId, pageNumber, itemsPerPage) => {
  return collaborationApi.getObjects( documentId, className, {
    category: categoryId,
    page: pageNumber,
    per_page: itemsPerPage,
  });
}

export const fetchIdfObjectDetails = (documentId, className, objectId) => {
  return collaborationApi.getObject(documentId, className, objectId);
}

export const createIdfObject = (documentId, className, idfObject) => {
  return collaborationApi.createObject(documentId, className, idfObject);
}


export const updateIdfObject = (documentId, className, objectId, idfObject) => {
  return collaborationApi.updateObject(idfObject);
}

export const deleteIdfObject = (documentId, className, idfObjectId) => {
  return collaborationApi.deleteObject({
    id:          idfObjectId,
    document_id: documentId,
    class_name:  className,
  });
}


export const getObjectsByClassList = (documentId, listClassName) => {
  return collaborationApi.getObjectsByClassList(documentId, listClassName);
}

export const addObjects = (documentId, data) => {
  return collaborationApi.addObjects(documentId, data);
}

export const fetchReference = (documentId, referenceName) => {
  return collaborationApi.getReference(documentId, referenceName);
}

export const fetchExternalList = (documentId, external_list_name) => {
  return collaborationApi.getExternalList(documentId, external_list_name);
}