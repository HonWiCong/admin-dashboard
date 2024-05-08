/** @type {import('./$types').PageLoad} */
export function load() {
	return {
		all_time_series: [
			{
				name: '2019',
				data: [20894, 19209, 18732, 18456, 18008, 17967, 19000, 19426, 19900, 20012, 23789, 24503],
				color: '#EF562F'
			},
			{
				name: '2020',
				data: [21780, 19325, 19906, 18340, 17018, 16589, 17102, 17803, 18450, 18961, 19508, 20002],
				color: '#FEE2D1'
			},
			{
				name: '2021',
				data: [19560, 19123, 18700, 17302, 17901, 18437, 19002, 19612, 20238, 20900, 21405, 22000],
				color: '#F8DE2C'
			},
			{
				name: '2022',
				data: [21592, 19021, 19801, 18023, 17530, 16034, 16600, 17150, 17700, 18256, 18800, 19402],
				color: '#3570D7'
			},
			{
				name: '2023',
				data: [19109, 18894, 17568, 17406, 16972, 16793, 16427, 16205, 15433, 16854, 17406, 17961],
				color: '#67CA4A'
			}
		],
		today_series: [
			{
				name: 'Today',
				data: [0, 0, 6, 52, 70, 67, 84, 41, 1],
				color: '#EF562F'
			},
		],
		week_series: [
			{
				name: 'Week',
				data: [321, 357, 292, 312, 691, 679, 604],
				color: '#EF562F'
			},
		],
		month_series: [
			{
				name: 'Month',
				data: [3251, 3486, 3427, 2945],
				color: '#EF562F'
			},
		],
		year_series: [
			{
				name: 'Year',
				data: [13109, 12894, 14568, 13406, 13972, 14793, 15427, 16205, 15433, 16854, 17406, 17961],
				color: '#EF562F'
			},
		],
	};
}
