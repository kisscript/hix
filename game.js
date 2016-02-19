var window = window;
	window.time = 0;
	window.tick = 30;

Object.defineProperty
(
	window,
	'ontick',
	{
		set: function (f)
		{
			window.clock = window.setInterval
			(
				function ()
				{
					window.time += window.tick;
					f ({ time: window.time, type: 'tick' });
				},
				window.tick
			);
		}
	}
);

var game =
{
	canvas:
	{
		load: function ()
		{
			var canvas = window.document.createElement ('canvas');
			canvas.context = canvas.getContext ('2d');
			canvas.refresh = true;
			canvas.render = {};

			canvas.append = function ()
			{
				window.document.body.appendChild (canvas);
			};

			canvas.autosize = function ()
			{
				canvas.refresh = true;
				canvas.height = window.innerHeight;
				canvas.width = window.innerWidth;
			};

			canvas.convert = function (value)
			{
				value.type = (value.h) ? 'horisontal' : value.type;
				value.type = (value.w) ? 'vertical' : value.type;
				value.type = (value.x) ? 'x' : value.type;
				value.type = (value.y) ? 'y' : value.type;
				switch (value.type)
				{
					case 'horisontal':
						var v = value.h;
						var k = value.k;
						v = ((v > 0) && (v <= 1)) ? game.canvas.height * v : v;
						value = v * k;
					break;

					case 'vertical':
						var v = value.w;
						var k = value.k;
						v = ((v > 0) && (v <= 1)) ? game.canvas.width * v : v;
						value = v * k;
					break;

					case 'x':
						var x = value.x;
							x = ((x > 0) && (x <= 1)) ? game.canvas.width * x : x;
						var w = game.canvas.convert(value.w);
							w = ((w > 0) && (w <= 1)) ? game.canvas.width * w : w;
						var k = value.k;
						value = x - w * k;
					break;

					case 'y':
						var y = value.y;
							y = ((y > 0) && (y <= 1)) ? game.canvas.height * y : y;
						var h = game.canvas.convert(value.h);
							h = ((h > 0) && (h <= 1)) ? game.canvas.height * h : h;
						var k = value.k;
						value = y - h * k;
					break;
				};
				return value;
			};

			canvas.horisontal = function (value)
			{
				if (typeof(value) == 'object')
				{
					value = canvas.convert (value);
				}
				else
				{
					value = ((value > 0) && (value <= 1)) ? game.canvas.width * value : value;
				};
				return value;
			};

			canvas.clear = function ()
			{
				game.canvas.context.clearRect (0, 0, canvas.width, canvas.height);
			};

			canvas.minimal = function (value)
			{
				value = ((value > 0) && (value <= 1)) ? Math.min (game.canvas.height, game.canvas.width) * value : value;
				return value;
			};

			canvas.maximal = function (value)
			{
				value = ((value > 0) && (value <= 1)) ? Math.max (game.canvas.height, game.canvas.width) * value : value;
				return value;
			};

			canvas.update = function ()
			{
				switch (game.event.type)
				{
					case 'load':
						canvas.append ();
						canvas.autosize ();
					break;

					case 'resize':
						canvas.autosize ();
					break;
				};
			};

			canvas.vertical = function (value)
			{
				if (typeof(value) == 'object')
				{
					value = canvas.convert (value);
				}
				else
				{
					value = ((value > 0) && (value <= 1)) ? game.canvas.height * value : value;
				};
				return value;
			};

		delete game['canvas'];
		game.canvas = canvas;
		}
	},

	create:
	{
		set button (button)
		{
			game.object.add = button;
		}
	},

	set draw (design)
	{
		if (design)
		{
			game.canvas.refresh = true;

			design.id = (design.id) ? design.id : Object.keys (game.canvas.render).length;

			design.type = 'box';
			design.type = (design.i) ? 'image' : design.type;
			design.type = (design.a) ? 'line' : design.type;
			design.type = (design.r) ? 'ring' : design.type;
			design.type = (design.t) ? 'text' : design.type;

			game.canvas.render[design.id] = design;
		}
		else
		{
			if (game.canvas.refresh)
			{
				var context = game.canvas.context;
				game.canvas.refresh = false;

				game.canvas.clear ();

				for (var id in game.canvas.render)
				{
					var render = game.canvas.render[id];

					var a = game.canvas.horisontal (render.a);
					var b = game.canvas.vertical (render.b);

					var h = game.canvas.vertical (render.h);
					var r = game.canvas.minimal (render.r);
					var w = game.canvas.horisontal (render.w);

					var x = game.canvas.horisontal (render.x);
					var y = game.canvas.vertical (render.y);

					context.beginPath ();
					context.lineWidth = (render.line) ? render.line : 1;
					var _ = (render.fill) ? context.fillStyle = render.color : context.strokeStyle = render.color;
					var _ = (render.dash) ? context.setLineDash (render.dash) : undefined;
					var _ = (render.offset) ? context.lineDashOffset = render.offset : undefined;

					switch (render.type)
					{
						case 'box':
							var _ = (render.fill) ? context.fillRect (x, y, w, h) : context.strokeRect (x, y, w, h);
						break;

						case 'image':
							var _ = (h) ? context.drawImage (render.i, x, y, w, h) : context.drawImage (render.i, x, y);
						break;

						case 'line':
							context.moveTo (a, b);
							context.lineTo (x, y);
							context.stroke ();
						break;

						case 'line':
							gcontext.arc (x, y, r, a, b);
							var _ = (render.fill) ? context.fill () : context.stroke ();
						break;

						case 'text':
							var _ = (render.fill) ? context.fillText (render.text, x, y) : context.strokeText (render.text, x, y);
						break;
					};
				};
			};
		};
	},

	event:
	{
		listener: function (event)
		{
			game.event.key = event.which || event.keyCode;
			game.event.time = event.time;
			game.event.type = event.type;
			game.event.x = event.x;
			game.event.y = event.y;
			game.run ();
		},

		load: function ()
		{
			window.onclick = game.event.listener;
			window.onload = game.event.listener;
			window.onmousedown = game.event.listener;
			window.onmousemove = game.event.listener;
			window.onmouseup = game.event.listener;
			window.onresize = game.event.listener;
			window.ontick = game.event.listener;
		},

		type: {}
	},

	load: function ()
	{
		game.canvas.load ();
		game.event.load ();
	},

	object:
	{
		set add (object)
		{
			game.object.id = object;
			game.object[object.tag][object.id] = object;
		},

		set id (object)
		{
			var tag = object.constructor.name;
			object.tag = tag;
			var _ = (game.object[tag] == undefined) ? game.object[tag] = {} : undefined;
			object.id = tag + Object.keys (game.object[tag]).length;
		}
	},

	run: function ()
	{
		game.update ();
		game.draw = undefined;
	},

	scene: { main: [] },

	update: function ()
	{
		game.canvas.update ();
	}
};

game.load ();

game.draw =
{
	x: { x: 0.5, w: { h: 0.2, k: 1 }, k: 0.5 },
	y: { y: 0.5, h: 0.2, k: 0.5 },
	h: 0.2,
	w: { h: 0.2, k: 1 },
	fill: true
};