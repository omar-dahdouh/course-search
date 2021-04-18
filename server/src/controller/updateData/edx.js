const { join } = require('path');
const fs = require('fs');
const axios = require('axios');
const urlencode = require('urlencode');

const { insertCourses, deleteCourses } = require('../../database/query')

async function fetchData(url, payload) {
    return (await axios.post(url, payload)).data;
}

async function update(req, res) {

    const url = 'https://igsyv1z1xi-2.algolianet.com/1/indexes/*/queries?'
        + 'x-algolia-api-key=448c9e20c867b4a3f602687b5ec33890&'
        + 'x-algolia-application-id=IGSYV1Z1XI';

    const courseIndex = new Map();
    const courseList = [];

    const catPath = join(__dirname, 'catalog.json');
    const catalog = JSON.parse(await fs.promises.readFile(catPath));
    const source = catalog[2].id;
    const categories = catalog[2].sub;

   
    const promises = categories.map(cat => {
        const params = {
            maxValuesPerFacet: 1,
            hitsPerPage: 24,
            page: 0,
            attributesToRetrieve: [
                'title',
                'primary_description',
                'secondary_description',
                'tertiary_description',
                'marketing_url',
                'card_image_url',
                'objectID',
                'active_run_start',
            ],
            facets: ["*"],
            attributesToHighlight: [],
            attributesToSnippet: [],
            facetFilters: [
                [`subject:${cat.name}`],
                ['language:English'],
                ['product:Course'],
            ],
        }
        const payload = {
            requests: [
                {
                    indexName: "product",
                    params: Object.keys(params).map(key =>
                            `${key}=${urlencode(JSON.stringify(params[key]))}`
                        ).join('&'),
                }
            ]
        }
        return fetchData(url, payload);
    })

    const data = await Promise.all(promises);

    for (const [idx, cat] of categories.entries()) {
        const courses = data[idx].results[0].hits;

        for (const course of courses) {
            if (courseIndex.has(course.objectID)) {
                const index = courseIndex.get(course.objectID);
                courseList[index].categories.push(cat.id);
            } else {
                courseIndex.set(course.objectID, courseList.length);

                courseList.push({
                    source: source,
                    title: course.title,
                    description: [
                            course.primary_description,
                            course.secondary_description,
                            course.tertiary_description,
                        ].join('\n'),
                    date: new Date(course.active_run_start*1000).toISOString(),
                    url: course.marketing_url
                        .replace('https://www.edx.org/course/', ''),
                    image: course.card_image_url
                        .replace('https://prod-discovery.edx-cdn.org/media/course/image/', ''),
                    categories: [cat.id],
                })
            }
        }
    }

    if (courseList.length > 0) {
        await deleteCourses(source);
        const results = await insertCourses(courseList);

        res.json({
            message: 'updated',
            rowCount: results.rowCount,
        });
    } else {
        res.json({
            message: 'error',
            rowCount: 0,
        });
    }

}

module.exports = update;
