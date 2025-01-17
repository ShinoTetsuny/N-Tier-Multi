import newsSchema from "../schema/zod/news.js";
import News from "../schema/mongo/news.js";
const createNews = async (req, res) => {
	console.log("req.body", req.body);
	let data;
	try {
		data = newsSchema.parse(req.body);
		console.log(data);
	} catch (error) {
		console.log(error);
		return res.status(400).send({ error: error.message });
	}

	try {
		const news = await News.create(data);
		return res.status(201).send(news);
	} catch (error) {
		return res.status(500).send({ error: error.message });
	}
};

const getNews = async (req, res) => {
	const news = await News.find();
	console.log(news);
	return res.status(200).send(news);
};

const updateNews = async (req, res) => {
	let data;
	let id = req.params.id;
	try {
		data = newsSchema.parse(req.body);
	} catch (error) {
		return res.status(400).send({ error: error.message });
	}
	try {
		const news = await News.findByIdAndUpdate(id, data);
		return res.status(200).send(news);
	} catch (error) {
		return res.status(500).send({ error: error.message });
	}
};

const deleteNews = async (req, res) => {
	try {
		const news = await News.findByIdAndDelete(req.params.id);
		return res.status(200).send(news);
	} catch (error) {
		return res.status(500).send({ error: error.message });
	}
};

export { createNews, getNews, updateNews, deleteNews };
