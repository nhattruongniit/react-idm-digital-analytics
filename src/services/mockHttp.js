import { dataProject, dataDocument, dataSimulator, dataChart } from 'mockData';

export const fetchProject = () => {
  const data = new Promise(resovle => {
    setTimeout(() => {
      resovle(dataProject)
    }, 100)
  });

  return data;
}

export const fetchDocument = (projectId) => {
  const data = new Promise(resovle => {
    const document = dataDocument.filter(document => document.project_id === projectId)
    setTimeout(() => {
      resovle(document)
    }, 100)
  });

  return data;
}

export const fetchSimulator = (documentId) => {
  const data = new Promise(resovle => {
    const simulator = dataSimulator.filter(sim => sim.document_id === documentId)
    setTimeout(() => {
      resovle(simulator)
    }, 100)
  });

  return data;
}

export const fetchChart = (simulatorId) => {
  const data = new Promise(resovle => {
    const chart = dataChart.filter(ele => ele.parent_simulation_id === simulatorId)
    setTimeout(() => {
      resovle(chart)
    }, 100)
  });

  return data;
}

