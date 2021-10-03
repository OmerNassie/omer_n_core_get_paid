import axios from "axios";

//TODO: export to environment file
export const baseUrl = "https://ll.thespacedevs.com/2.2.0";
const getLaunchesEndpoint = "launch";

const generateQueryString = (pageSize, pageNumber, fromDate, toDate, search) => `?limit=${pageSize}&offset=${
  (pageNumber - 1) * pageSize
}&ordering=-net${fromDate ? `&net__gte=${fromDate}` : ""}${
  toDate ? `&net__lte=${toDate}` : ""
}${search ? `&search=${search}` : ""}`;

const HttpUtils = {
  /**
   * Gets paginated and filtered launches records
   * @param {number} pageNumber
   * @param {number} pageSize
   * @param {string} search
   * @param {string} fromDate
   * @param {string} toDate
   * @returns a list of paginated and filtered results by the search criterias
   */
  get: async (
    pageNumber,
    pageSize,
    search = "",
    fromDate = null,
    toDate = null
  ) => {
    let qs = generateQueryString(pageSize, pageNumber, fromDate, toDate, search);

    const response = await axios.get(`${baseUrl}/${getLaunchesEndpoint}${qs}`)
      .catch(function (error) {
        if (error.response) {
          // Request made and server responded
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
      });

    if (response && response.data) {
      return response.data;
    } else {
      return [];
    }
  },
};

export default HttpUtils;

//Mock
/*const response = {
      data: {
        count: 17,
        next: "https://ll.thespacedevs.com/2.2.0/launch/?limit=5&offset=10&ordering=net&search=Sputnik",
        previous:
          "https://ll.thespacedevs.com/2.2.0/launch/?limit=5&ordering=net&search=Sputnik",
        results: [
          {
            id: "962f4ad2-81e0-43f9-8148-fb78f52cb0f5",
            url: "https://ll.thespacedevs.com/2.2.0/launch/962f4ad2-81e0-43f9-8148-fb78f52cb0f5/",
            slug: "vostok-8k72-korabl-sputnik-2",
            name: "Vostok 8K72 | Korabl-Sputnik (2)",
            status: {
              id: 4,
              name: "Launch Failure",
              abbrev: "Failure",
              description:
                "Either the launch vehicle did not reach orbit, or the payload(s) failed to separate.",
            },
            last_updated: "2021-09-02T14:26:04Z",
            net: "1960-07-28T09:31:00Z",
            window_end: "1960-07-28T09:31:00Z",
            window_start: "1960-07-28T09:31:00Z",
            probability: null,
            holdreason: "",
            failreason: "",
            hashtag: null,
            launch_service_provider: {
              id: 66,
              url: "https://ll.thespacedevs.com/2.2.0/agencies/66/",
              name: "Soviet Space Program",
              type: "Government",
            },
            rocket: {
              id: 3072,
              configuration: {
                id: 453,
                url: "https://ll.thespacedevs.com/2.2.0/config/launcher/453/",
                name: "Vostok 8K72",
                family: "Vostok",
                full_name: "Vostok 8K72",
                variant: "8K72",
              },
            },
            mission: {
              id: 1494,
              name: "Korabl-Sputnik (2)",
              description:
                "A test of the Vostok capsule carrying a pair of dogs. Unfortunately this failed after a failure of the booster.",
              launch_designator: null,
              type: "Test Flight",
              orbit: {
                id: 8,
                name: "Low Earth Orbit",
                abbrev: "LEO",
              },
            },
            pad: {
              id: 32,
              url: "https://ll.thespacedevs.com/2.2.0/pad/32/",
              agency_id: null,
              name: "1/5",
              info_url: null,
              wiki_url: "",
              map_url:
                "https://www.google.com/maps/place/45Â°55'12.0\"N+63Â°20'31.2\"E",
              latitude: "45.92",
              longitude: "63.342",
              location: {
                id: 15,
                url: "https://ll.thespacedevs.com/2.2.0/location/15/",
                name: "Baikonur Cosmodrome, Republic of Kazakhstan",
                country_code: "KAZ",
                map_image:
                  "https://spacelaunchnow-prod-east.nyc3.digitaloceanspaces.com/media/launch_images/location_15_20200803142517.jpg",
                total_launch_count: 1523,
                total_landing_count: 0,
              },
              map_image:
                "https://spacelaunchnow-prod-east.nyc3.digitaloceanspaces.com/media/launch_images/pad_32_20200803143513.jpg",
              total_launch_count: 487,
            },
            webcast_live: false,
            image: null,
            infographic: null,
            program: [
              {
                id: 9,
                url: "https://ll.thespacedevs.com/2.2.0/program/9/",
                name: "Vostok",
                description:
                  "The Vostok programme was a Soviet human spaceflight project to put the first Soviet citizens into low Earth orbit and return them safely. Competing with the United States Project Mercury, it succeeded in placing the first human into space, Yuri Gagarin, in a single orbit in Vostok 1 on April 12, 1961.",
                agencies: [
                  {
                    id: 66,
                    url: "https://ll.thespacedevs.com/2.2.0/agencies/66/",
                    name: "Soviet Space Program",
                    type: "Government",
                  },
                ],
                image_url:
                  "https://spacelaunchnow-prod-east.nyc3.digitaloceanspaces.com/media/program_images/vostok_program_20210417063956.png",
                start_date: "1961-04-12T06:07:00Z",
                end_date: "1963-06-19T08:20:00Z",
                info_url: null,
                wiki_url: "https://en.wikipedia.org/wiki/Vostok_programme",
                mission_patches: [],
              },
            ],
          },
          {
            id: "5d75ee96-a897-499f-8f48-7d98d78fc01c",
            url: "https://ll.thespacedevs.com/2.2.0/launch/5d75ee96-a897-499f-8f48-7d98d78fc01c/",
            slug: "vostok-8k72-korabl-sputnik-2-2",
            name: "Vostok 8K72 | Korabl'-Sputnik-2",
            status: {
              id: 3,
              name: "Launch Successful",
              abbrev: "Success",
              description:
                "The launch vehicle successfully inserted its payload(s) into the target orbit(s).",
            },
            last_updated: "2021-09-02T14:26:14Z",
            net: "1960-08-19T08:44:06Z",
            window_end: "1960-08-19T08:44:06Z",
            window_start: "1960-08-19T08:44:06Z",
            probability: null,
            holdreason: "",
            failreason: "",
            hashtag: null,
            launch_service_provider: {
              id: 66,
              url: "https://ll.thespacedevs.com/2.2.0/agencies/66/",
              name: "Soviet Space Program",
              type: "Government",
            },
            rocket: {
              id: 3077,
              configuration: {
                id: 453,
                url: "https://ll.thespacedevs.com/2.2.0/config/launcher/453/",
                name: "Vostok 8K72",
                family: "Vostok",
                full_name: "Vostok 8K72",
                variant: "8K72",
              },
            },
            mission: {
              id: 1499,
              name: "Korabl'-Sputnik-2",
              description:
                "A test of the Vostok capsule which carried dogs Belka and Stelka (amonst other animals) the flight was successful and all animals were recovered successfully.",
              launch_designator: null,
              type: "Test Flight",
              orbit: {
                id: 8,
                name: "Low Earth Orbit",
                abbrev: "LEO",
              },
            },
            pad: {
              id: 32,
              url: "https://ll.thespacedevs.com/2.2.0/pad/32/",
              agency_id: null,
              name: "1/5",
              info_url: null,
              wiki_url: "",
              map_url:
                "https://www.google.com/maps/place/45Â°55'12.0\"N+63Â°20'31.2\"E",
              latitude: "45.92",
              longitude: "63.342",
              location: {
                id: 15,
                url: "https://ll.thespacedevs.com/2.2.0/location/15/",
                name: "Baikonur Cosmodrome, Republic of Kazakhstan",
                country_code: "KAZ",
                map_image:
                  "https://spacelaunchnow-prod-east.nyc3.digitaloceanspaces.com/media/launch_images/location_15_20200803142517.jpg",
                total_launch_count: 1523,
                total_landing_count: 0,
              },
              map_image:
                "https://spacelaunchnow-prod-east.nyc3.digitaloceanspaces.com/media/launch_images/pad_32_20200803143513.jpg",
              total_launch_count: 487,
            },
            webcast_live: false,
            image: null,
            infographic: null,
            program: [
              {
                id: 9,
                url: "https://ll.thespacedevs.com/2.2.0/program/9/",
                name: "Vostok",
                description:
                  "The Vostok programme was a Soviet human spaceflight project to put the first Soviet citizens into low Earth orbit and return them safely. Competing with the United States Project Mercury, it succeeded in placing the first human into space, Yuri Gagarin, in a single orbit in Vostok 1 on April 12, 1961.",
                agencies: [
                  {
                    id: 66,
                    url: "https://ll.thespacedevs.com/2.2.0/agencies/66/",
                    name: "Soviet Space Program",
                    type: "Government",
                  },
                ],
                image_url:
                  "https://spacelaunchnow-prod-east.nyc3.digitaloceanspaces.com/media/program_images/vostok_program_20210417063956.png",
                start_date: "1961-04-12T06:07:00Z",
                end_date: "1963-06-19T08:20:00Z",
                info_url: null,
                wiki_url: "https://en.wikipedia.org/wiki/Vostok_programme",
                mission_patches: [],
              },
            ],
          },
          {
            id: "787e5a38-9f51-4543-a218-5d1e5690bb34",
            url: "https://ll.thespacedevs.com/2.2.0/launch/787e5a38-9f51-4543-a218-5d1e5690bb34/",
            slug: "vostok-8k72-korabl-sputnik-3",
            name: "Vostok 8K72 | Korabl'-Sputnik-3",
            status: {
              id: 3,
              name: "Launch Successful",
              abbrev: "Success",
              description:
                "The launch vehicle successfully inserted its payload(s) into the target orbit(s).",
            },
            last_updated: "2021-09-02T14:26:25Z",
            net: "1960-12-01T07:30:04Z",
            window_end: "1960-12-01T07:30:04Z",
            window_start: "1960-12-01T07:30:04Z",
            probability: null,
            holdreason: "",
            failreason: "",
            hashtag: null,
            launch_service_provider: {
              id: 66,
              url: "https://ll.thespacedevs.com/2.2.0/agencies/66/",
              name: "Soviet Space Program",
              type: "Government",
            },
            rocket: {
              id: 3091,
              configuration: {
                id: 453,
                url: "https://ll.thespacedevs.com/2.2.0/config/launcher/453/",
                name: "Vostok 8K72",
                family: "Vostok",
                full_name: "Vostok 8K72",
                variant: "8K72",
              },
            },
            mission: {
              id: 1513,
              name: "Korabl'-Sputnik-3",
              description:
                "Another test of the Vostok capsule which had a successful flight into orbit but during re-entry the engine failed to cut off and burned to completion resulting in an incorrect entry trajectory. The vehicle was destroyed in order to ensure the vehicle didn't fall into enemy hands.",
              launch_designator: null,
              type: "Test Flight",
              orbit: {
                id: 8,
                name: "Low Earth Orbit",
                abbrev: "LEO",
              },
            },
            pad: {
              id: 32,
              url: "https://ll.thespacedevs.com/2.2.0/pad/32/",
              agency_id: null,
              name: "1/5",
              info_url: null,
              wiki_url: "",
              map_url:
                "https://www.google.com/maps/place/45Â°55'12.0\"N+63Â°20'31.2\"E",
              latitude: "45.92",
              longitude: "63.342",
              location: {
                id: 15,
                url: "https://ll.thespacedevs.com/2.2.0/location/15/",
                name: "Baikonur Cosmodrome, Republic of Kazakhstan",
                country_code: "KAZ",
                map_image:
                  "https://spacelaunchnow-prod-east.nyc3.digitaloceanspaces.com/media/launch_images/location_15_20200803142517.jpg",
                total_launch_count: 1523,
                total_landing_count: 0,
              },
              map_image:
                "https://spacelaunchnow-prod-east.nyc3.digitaloceanspaces.com/media/launch_images/pad_32_20200803143513.jpg",
              total_launch_count: 487,
            },
            webcast_live: false,
            image: null,
            infographic: null,
            program: [
              {
                id: 9,
                url: "https://ll.thespacedevs.com/2.2.0/program/9/",
                name: "Vostok",
                description:
                  "The Vostok programme was a Soviet human spaceflight project to put the first Soviet citizens into low Earth orbit and return them safely. Competing with the United States Project Mercury, it succeeded in placing the first human into space, Yuri Gagarin, in a single orbit in Vostok 1 on April 12, 1961.",
                agencies: [
                  {
                    id: 66,
                    url: "https://ll.thespacedevs.com/2.2.0/agencies/66/",
                    name: "Soviet Space Program",
                    type: "Government",
                  },
                ],
                image_url:
                  "https://spacelaunchnow-prod-east.nyc3.digitaloceanspaces.com/media/program_images/vostok_program_20210417063956.png",
                start_date: "1961-04-12T06:07:00Z",
                end_date: "1963-06-19T08:20:00Z",
                info_url: null,
                wiki_url: "https://en.wikipedia.org/wiki/Vostok_programme",
                mission_patches: [],
              },
            ],
          },
          {
            id: "8050ce4c-2d75-4c11-92e3-132f1db585c6",
            url: "https://ll.thespacedevs.com/2.2.0/launch/8050ce4c-2d75-4c11-92e3-132f1db585c6/",
            slug: "vostok-korabl-sputnik-4",
            name: "Vostok | Korabl-Sputnik (4)",
            status: {
              id: 4,
              name: "Launch Failure",
              abbrev: "Failure",
              description:
                "Either the launch vehicle did not reach orbit, or the payload(s) failed to separate.",
            },
            last_updated: "2021-09-02T14:26:35Z",
            net: "1960-12-22T07:45:19Z",
            window_end: "1960-12-22T07:45:19Z",
            window_start: "1960-12-22T07:45:19Z",
            probability: null,
            holdreason: "",
            failreason: "",
            hashtag: null,
            launch_service_provider: {
              id: 66,
              url: "https://ll.thespacedevs.com/2.2.0/agencies/66/",
              name: "Soviet Space Program",
              type: "Government",
            },
            rocket: {
              id: 3096,
              configuration: {
                id: 103,
                url: "https://ll.thespacedevs.com/2.2.0/config/launcher/103/",
                name: "Vostok",
                family: "R-7",
                full_name: "Vostok-K",
                variant: "K",
              },
            },
            mission: {
              id: 1518,
              name: "Korabl-Sputnik (4)",
              description:
                "Maiden flight of Vostok-K, second stage engine failure, spacecraft separated and recovered. Two dogs aboard, both survived.",
              launch_designator: null,
              type: "Test Flight",
              orbit: {
                id: 8,
                name: "Low Earth Orbit",
                abbrev: "LEO",
              },
            },
            pad: {
              id: 32,
              url: "https://ll.thespacedevs.com/2.2.0/pad/32/",
              agency_id: null,
              name: "1/5",
              info_url: null,
              wiki_url: "",
              map_url:
                "https://www.google.com/maps/place/45Â°55'12.0\"N+63Â°20'31.2\"E",
              latitude: "45.92",
              longitude: "63.342",
              location: {
                id: 15,
                url: "https://ll.thespacedevs.com/2.2.0/location/15/",
                name: "Baikonur Cosmodrome, Republic of Kazakhstan",
                country_code: "KAZ",
                map_image:
                  "https://spacelaunchnow-prod-east.nyc3.digitaloceanspaces.com/media/launch_images/location_15_20200803142517.jpg",
                total_launch_count: 1523,
                total_landing_count: 0,
              },
              map_image:
                "https://spacelaunchnow-prod-east.nyc3.digitaloceanspaces.com/media/launch_images/pad_32_20200803143513.jpg",
              total_launch_count: 487,
            },
            webcast_live: false,
            image:
              "https://spacelaunchnow-prod-east.nyc3.digitaloceanspaces.com/media/launcher_images/vostok_image_20191104130128.jpg",
            infographic: null,
            program: [
              {
                id: 9,
                url: "https://ll.thespacedevs.com/2.2.0/program/9/",
                name: "Vostok",
                description:
                  "The Vostok programme was a Soviet human spaceflight project to put the first Soviet citizens into low Earth orbit and return them safely. Competing with the United States Project Mercury, it succeeded in placing the first human into space, Yuri Gagarin, in a single orbit in Vostok 1 on April 12, 1961.",
                agencies: [
                  {
                    id: 66,
                    url: "https://ll.thespacedevs.com/2.2.0/agencies/66/",
                    name: "Soviet Space Program",
                    type: "Government",
                  },
                ],
                image_url:
                  "https://spacelaunchnow-prod-east.nyc3.digitaloceanspaces.com/media/program_images/vostok_program_20210417063956.png",
                start_date: "1961-04-12T06:07:00Z",
                end_date: "1963-06-19T08:20:00Z",
                info_url: null,
                wiki_url: "https://en.wikipedia.org/wiki/Vostok_programme",
                mission_patches: [],
              },
            ],
          },
          {
            id: "7e00f7c3-7648-450a-a69b-6bc94e317d04",
            url: "https://ll.thespacedevs.com/2.2.0/launch/7e00f7c3-7648-450a-a69b-6bc94e317d04/",
            slug: "vostok-k-sputnik-9",
            name: "Vostok-K | Sputnik 9",
            status: {
              id: 3,
              name: "Launch Successful",
              abbrev: "Success",
              description:
                "The launch vehicle successfully inserted its payload(s) into the target orbit(s).",
            },
            last_updated: "2020-10-31T03:00:13Z",
            net: "1961-03-09T06:29:00Z",
            window_end: "1961-03-09T06:29:00Z",
            window_start: "1961-03-09T06:29:00Z",
            probability: 0,
            holdreason: "",
            failreason: "",
            hashtag: "",
            launch_service_provider: {
              id: 270,
              url: "https://ll.thespacedevs.com/2.2.0/agencies/270/",
              name: "Strategic Missile Troops",
              type: null,
            },
            rocket: {
              id: 2370,
              configuration: {
                id: 103,
                url: "https://ll.thespacedevs.com/2.2.0/config/launcher/103/",
                name: "Vostok",
                family: "R-7",
                full_name: "Vostok-K",
                variant: "K",
              },
            },
            mission: null,
            pad: {
              id: 32,
              url: "https://ll.thespacedevs.com/2.2.0/pad/32/",
              agency_id: null,
              name: "1/5",
              info_url: null,
              wiki_url: "",
              map_url:
                "https://www.google.com/maps/place/45Â°55'12.0\"N+63Â°20'31.2\"E",
              latitude: "45.92",
              longitude: "63.342",
              location: {
                id: 15,
                url: "https://ll.thespacedevs.com/2.2.0/location/15/",
                name: "Baikonur Cosmodrome, Republic of Kazakhstan",
                country_code: "KAZ",
                map_image:
                  "https://spacelaunchnow-prod-east.nyc3.digitaloceanspaces.com/media/launch_images/location_15_20200803142517.jpg",
                total_launch_count: 1523,
                total_landing_count: 0,
              },
              map_image:
                "https://spacelaunchnow-prod-east.nyc3.digitaloceanspaces.com/media/launch_images/pad_32_20200803143513.jpg",
              total_launch_count: 487,
            },
            webcast_live: false,
            image:
              "https://spacelaunchnow-prod-east.nyc3.digitaloceanspaces.com/media/launcher_images/vostok_image_20191104130128.jpg",
            infographic: null,
            program: [
              {
                id: 9,
                url: "https://ll.thespacedevs.com/2.2.0/program/9/",
                name: "Vostok",
                description:
                  "The Vostok programme was a Soviet human spaceflight project to put the first Soviet citizens into low Earth orbit and return them safely. Competing with the United States Project Mercury, it succeeded in placing the first human into space, Yuri Gagarin, in a single orbit in Vostok 1 on April 12, 1961.",
                agencies: [
                  {
                    id: 66,
                    url: "https://ll.thespacedevs.com/2.2.0/agencies/66/",
                    name: "Soviet Space Program",
                    type: "Government",
                  },
                ],
                image_url:
                  "https://spacelaunchnow-prod-east.nyc3.digitaloceanspaces.com/media/program_images/vostok_program_20210417063956.png",
                start_date: "1961-04-12T06:07:00Z",
                end_date: "1963-06-19T08:20:00Z",
                info_url: null,
                wiki_url: "https://en.wikipedia.org/wiki/Vostok_programme",
                mission_patches: [],
              },
            ],
          },
        ],
      },
    };*/