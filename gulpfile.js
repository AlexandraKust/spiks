const { src, dest, series, watch } = require('gulp')
const htmlMin = require('gulp-htmlmin')
const concat = require('gulp-concat')
const sass = require('gulp-sass')(require('sass'))
const sourcemaps = require('gulp-sourcemaps')
const svgSprite = require('gulp-svg-sprite')
const uglify = require('gulp-uglify-es').default
const babel = require('gulp-babel')
const notify = require('gulp-notify')
const browserSync = require('browser-sync').create()
const autoprefixer = require('gulp-autoprefixer')
const clean = require('gulp-clean')
const webp = require('gulp-webp')
const newer = require('gulp-newer')
const fonter = require('gulp-fonter')
const ttf2woff2 = require('gulp-ttf2woff2')


const images = () => {
	return src(['src/media/img/*'])
		.pipe(newer('dist/media/img'))
		.pipe(webp())

		.pipe(dest('dist/media/img'))
}

const cleanDist = () => {
	if (src('dist'))
		return src('dist')
			.pipe(clean())
}

function fonts() {
	return src('src/fonts/*')
		.pipe(fonter({
			formats: ['woff', 'ttf']
		}))
		.pipe(src('dist/fonts/*.ttf'))
		.pipe(ttf2woff2())
		.pipe(dest('dist/fonts'))
}

const htmlMinify = () => {
	return src('src/**/*.html')
		.pipe(htmlMin({
			collapseWhitespace: true,
		}))
		.pipe(dest('dist'))
		.pipe(browserSync.stream())
}

const scss = () => {
	return src(['src/scss/style.scss', 'src/scss/*', '!src/scss/_*.scss'])
		.pipe(concat('style.min.css'))
		.pipe(sourcemaps.init())
		.pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
		.pipe(autoprefixer(['> .5%', 'last 2 versions']))
		.pipe(sourcemaps.write())
		.pipe(dest('dist/css'))
		.pipe(browserSync.stream())
};

const svgSprites = () => {
	return src(['src/media/svg/*.svg'])
		.pipe(svgSprite({
			mode: {
				stack: {
					sprite: '../sprite.svg',
					example: true
				}
			}
		}))
		.pipe(dest('dist/media'))
}

const script = () => {
	return src(['src/js/*.js'])
		.pipe(sourcemaps.init())
		.pipe(uglify().on('error', notify.onError()))
		.pipe(sourcemaps.write())
		.pipe(dest('dist/js'))
		.pipe(browserSync.stream())
}

const css = () => {
	return src(['src/css/*.css'])
		.pipe(dest('dist/css'))
		.pipe(browserSync.stream())
}

const watchFiles = () => {
	browserSync.init({
		server: {
			baseDir: 'dist'
		}
	})
}

watch('src/*.html', htmlMinify)
watch('src/scss/*.scss', scss)
watch('src/css/*.css', css)
watch('src/media/svg/*.svg', svgSprites)
watch('src/js/*.js', script)
watch('src/fonts/**', fonts)
watch('src/media/img', images)

exports.htmlMinify = htmlMinify;
exports.fonts = fonts;
exports.images = images;
exports.scss = scss;
exports.css = css;
exports.svgSprites = svgSprites;
exports.script = script;

exports.default = series(cleanDist, htmlMinify, fonts, images, scss, css, svgSprites, script, watchFiles)
