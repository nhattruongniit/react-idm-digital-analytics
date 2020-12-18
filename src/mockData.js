export const stackedBarData = {
  type: 'stackedBar',
  options: {
    "title": "Clicks by mailing",
    "axes": {
      "left": {
        "mapsTo": "value",
        "stacked": true
      },
      "bottom": {
        "mapsTo": "key",
        "scaleType": "labels"
      }
    },
    "height": "100%"
  },
  data: [
    {
      "group": "Dataset 1",
      "key": "Qty",
      "value": 65000
    },
    {
      "group": "Dataset 1",
      "key": "More",
      "value": 29123
    },
    {
      "group": "Dataset 1",
      "key": "Sold",
      "value": 35213
    },
    {
      "group": "Dataset 1",
      "key": "Restocking",
      "value": 51213
    },
    {
      "group": "Dataset 1",
      "key": "Misc",
      "value": 16932
    },
    {
      "group": "Dataset 2",
      "key": "Qty",
      "value": 32432
    },
    {
      "group": "Dataset 2",
      "key": "More",
      "value": 21312
    },
    {
      "group": "Dataset 2",
      "key": "Sold",
      "value": 56456
    },
    {
      "group": "Dataset 2",
      "key": "Restocking",
      "value": 21312
    },
    {
      "group": "Dataset 2",
      "key": "Misc",
      "value": 34234
    },
  ]
}

export const donutData = {
  type: 'donut',
  options: {
    "title": "Sales by services",
    "resizable": true,
    "legend": {
      "alignment": "center"
    },
    "donut": {
      "center": {
        "label": "Browsers"
      },
      "alignment": "center"
    },
    "height": "100%"
  },
  data: [
    {
      "group": "2V2N 9KYPM version 1",
      "value": 20000
    },
    {
      "group": "L22I P66EP L22I P66EP L22I P66EP",
      "value": 65000
    },
    {
      "group": "JQAI 2M4L1",
      "value": 75000
    },
    {
      "group": "J9DZ F37AP",
      "value": 1200
    },
    {
      "group": "YEL48 Q6XK YEL48",
      "value": 10000
    },
    {
      "group": "Misc",
      "value": 25000
    }
  ]
}

export const lineData = {
  type: 'line',
  options: {
    title: "Optimization rates (overall)",
    legend: {
      alignment: 'center',
      enabled: true
    },
    tooltip: {
      enabled: true,
      showTotal: true
    },
    height: '100%',
    axes: {
      bottom: {
        mapsTo: 'date',
        scaleType: 'time',
      },
      left: {
        mapsTo: 'value',
        scaleType: 'linear',
      },
    },
    color: {
      scale: {
        "Dataset 1": "blue",
        "Dataset 2": "#FF6633",
        "Dataset 3": "#00CC00",
        "Dataset 4": "#FFDC00",
      },
    },
    curve: 'curveMonotoneX',
  },
  data: [
    {
      "group": "Dataset 1",
      "date": '2001-01-21 07:00',
      "value": 34200
    },
    {
      "group": "Dataset 1",
      "date": '2001-01-22 08:00',
      "value": 23412
    },
    {
      "group": "Dataset 2",
      "date": '2001-01-21 08:00',
      "value": 34200
    },
    {
      "group": "Dataset 2",
      "date": '2001-01-22 12:00',
      "value": 45145
    },
    {
      "group": "Dataset 3",
      "date": '2001-01-21 09:00',
      "value": 41200
    },
    {
      "group": "Dataset 3",
      "date": '2001-01-22 13:00',
      "value": 14234
    },
    {
      "group": "Dataset 4",
      "date": '2001-01-21 10:00',
      "value": 22000
    },
    {
      "group": "Dataset 4",
      "date": '2001-01-22 19:00',
      "value": 32412
    },
  ]
}

export const stackedAreaData = {
  type: 'stackedArea',
  data: [
    {
      "group": "Dataset 1",
      "date": "2018-12-31T17:00:00.000Z",
      "value": 10000
    },
    {
      "group": "Dataset 1",
      "date": "2019-01-04T17:00:00.000Z",
      "value": 65000
    },
    {
      "group": "Dataset 1",
      "date": "2019-01-07T17:00:00.000Z",
      "value": 10000
    },
    {
      "group": "Dataset 1",
      "date": "2019-01-12T17:00:00.000Z",
      "value": 49213
    },
    {
      "group": "Dataset 1",
      "date": "2019-01-16T17:00:00.000Z",
      "value": 51213
    },
    {
      "group": "Dataset 2",
      "date": "2018-12-31T17:00:00.000Z",
      "value": 20000
    },
    {
      "group": "Dataset 2",
      "date": "2019-01-04T17:00:00.000Z",
      "value": 25000
    },
    {
      "group": "Dataset 2",
      "date": "2019-01-07T17:00:00.000Z",
      "value": 60000
    },
    {
      "group": "Dataset 2",
      "date": "2019-01-12T17:00:00.000Z",
      "value": 30213
    },
    {
      "group": "Dataset 2",
      "date": "2019-01-16T17:00:00.000Z",
      "value": 55213
    },
    {
      "group": "Dataset 3",
      "date": "2018-12-31T17:00:00.000Z",
      "value": 30000
    },
    {
      "group": "Dataset 3",
      "date": "2019-01-04T17:00:00.000Z",
      "value": 20000
    },
    {
      "group": "Dataset 3",
      "date": "2019-01-07T17:00:00.000Z",
      "value": 40000
    },
    {
      "group": "Dataset 3",
      "date": "2019-01-12T17:00:00.000Z",
      "value": 60213
    },
    {
      "group": "Dataset 3",
      "date": "2019-01-16T17:00:00.000Z",
      "value": 25213
    }
  ],
  options: {
    "title": "Stacked area (time series)",
    "axes": {
      "left": {
        "stacked": true
      },
      "bottom": {
        "scaleType": "time"
      }
    },
    "curve": "curveMonotoneX",
    "height": "100%"
  }
}

export const dataProject = [
  {
    id: 1,
    project_name: 'project 1'
  },
  {
    id: 2,
    project_name: 'project 2'
  },
  {
    id: 3,
    project_name: 'project 3'
  }
]

export const dataDocument = [
  {
    id: 1,
    project_id: 1,
    document_name: 'document 1',
  },
  {
    id: 2,
    project_id: 1,
    document_name: 'document 2',
  },
  {
    id: 3,
    project_id: 2,
    document_name: 'document 3',
  }
]

export const dataSimulator = [
  {
    id: 1,
    document_id: 1,
    simulator_name: 'simulator 1'
  },
  {
    id: 2,
    document_id: 2,
    simulator_name: 'simulator 2'
  }
]

export const dataChart = [
  {
    id: 1,
    parent_simulation_id: 1,
    chart_name: 'chart 1'
  },
  {
    id: 2,
    parent_simulation_id: 2,
    chart_name: 'chart 2'
  }
]

export const projectsData  = {
  data: [
    {
      charts: 0,
      copyright: "",
      created_at: "2020-12-17 15:37:58",
      description: "",
      forked: 0,
      id: 8,
      idf_documents: 1,
      project_name: "project 8",
      public: 0,
      public_project_id: null,
      remote: 0,
      simulations: 0,
      updated_at: "2020-12-17 15:37:58",
      version: "8.4",
      version_id: 1     
    },
    {
      charts: 0,
      copyright: "",
      created_at: "2020-12-17 15:37:58",
      description: "",
      forked: 0,
      id: 6,
      idf_documents: 1,
      project_name: "project 6",
      public: 0,
      public_project_id: null,
      remote: 0,
      simulations: 0,
      updated_at: "2020-12-17 15:37:58",
      version: "8.4",
      version_id: 1     
    },
    {
      charts: 0,
      copyright: "",
      created_at: "2020-12-17 15:37:58",
      description: "",
      forked: 0,
      id: 7,
      idf_documents: 1,
      project_name: "project 7",
      public: 0,
      public_project_id: null,
      remote: 0,
      simulations: 0,
      updated_at: "2020-12-17 15:37:58",
      version: "8.4",
      version_id: 1     
    },
    {
      charts: 0,
      copyright: "",
      created_at: "2020-12-17 15:37:58",
      description: "",
      forked: 0,
      id: 5,
      idf_documents: 1,
      project_name: "project 5",
      public: 0,
      public_project_id: null,
      remote: 0,
      simulations: 0,
      updated_at: "2020-12-17 15:37:58",
      version: "8.4",
      version_id: 1     
    },
    {
      charts: 0,
      copyright: "",
      created_at: "2020-12-17 15:37:58",
      description: "",
      forked: 0,
      id: 4,
      idf_documents: 1,
      project_name: "project 4",
      public: 0,
      public_project_id: null,
      remote: 0,
      simulations: 0,
      updated_at: "2020-12-17 15:37:58",
      version: "8.4",
      version_id: 1     
    },
    {
      charts: 0,
      copyright: "",
      created_at: "2020-12-17 15:37:58",
      description: "",
      forked: 0,
      id: 3,
      idf_documents: 1,
      project_name: "project 3",
      public: 0,
      public_project_id: null,
      remote: 0,
      simulations: 0,
      updated_at: "2020-12-17 15:37:58",
      version: "8.4",
      version_id: 1     
    },
    {
      charts: 0,
      copyright: "",
      created_at: "2020-12-17 15:37:58",
      description: "",
      forked: 0,
      id: 2,
      idf_documents: 1,
      project_name: "project 2",
      public: 0,
      public_project_id: null,
      remote: 0,
      simulations: 0,
      updated_at: "2020-12-17 15:37:58",
      version: "8.4",
      version_id: 1     
    },
    {
      charts: 0,
      copyright: "",
      created_at: "2020-12-17 15:37:58",
      description: "",
      forked: 0,
      id: 1,
      idf_documents: 1,
      project_name: "project 1",
      public: 0,
      public_project_id: null,
      remote: 0,
      simulations: 0,
      updated_at: "2020-12-17 15:37:58",
      version: "8.4",
      version_id: 1     
    }
  ],
  links: {
    first: "http://dev-02.workers.usonialabs.com/api/projects?page=1",
    last: "http://dev-02.workers.usonialabs.com/api/projects?page=1",
    next: null,
    prev: null,
    self: "link-value"
  },
  meta: {
    current_page: 1,
    from: 1,
    last_page: 1,
    path: "http://dev-02.workers.usonialabs.com/api/projects",
    per_page: "10",
    to: 8,
    total: 8
  }
}
