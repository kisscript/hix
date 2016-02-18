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

			canvas.append = function ()
			{
				window.document.body.appendChild (canvas);
			};

			canvas.autosize = function ()
			{
				canvas.height = window.innerHeight;
				canvas.width = window.innerWidth;
			};

			canvas.clear = function ()
			{
				game.canvas.context.clearRect (0, 0, canvas.width, canvas.height);
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
			canvas.refresh = true;

			design.id = (design.id) ? design.id : Object.keys (game.canvas.render).length;

			design.type = 'box';
			design.type = (design.image) ? 'image' : design.type;
			design.type = (design.a) ? 'line' : design.type;
			design.type = (design.r) ? 'ring' : design.type;
			design.type = (design.text) ? 'text' : design.type;

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

					var a = render.a;
					var b = render.b;

					var h = render.hight;
					var r = render.r;
					var w = render.width;

					var x = render.x;
					var y = render.y;

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
							var _ = (h) ? context.drawImage (render.image, x, y, w, h) : context.drawImage (render.image, x, y);
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
		game.draw;
	},

	scene: { main: [] },

	update: function ()
	{
		game.canvas.update ();
	}
};

game.load ();

game.create.button = {};
game.create.button = {};
game.create.button = {};