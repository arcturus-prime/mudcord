## Classes

<dl>
<dt><a href="#Collection">Collection</a> ⇐ <code>Map</code></dt>
<dd><p>A Map with some extra functions where the ID is used as an identifier</p>
</dd>
<dt><a href="#CommandHandler">CommandHandler</a> ⇐ <code><a href="#Base">Base</a></code></dt>
<dd><p>Handles incoming messages containing commands</p>
</dd>
<dt><a href="#Action">Action</a> ⇐ <code><a href="#Base">Base</a></code></dt>
<dd><p>Represents an action performed by a mob entity</p>
</dd>
<dt><a href="#Base">Base</a> ⇐ <code>AsyncEventEmitter</code></dt>
<dd><p>The base class for most other classes</p>
</dd>
<dt><a href="#Battle">Battle</a> ⇐ <code><a href="#Base">Base</a></code></dt>
<dd><p>Represents a battle.</p>
</dd>
<dt><a href="#Location">Location</a> ⇐ <code><a href="#Base">Base</a></code></dt>
<dd><p>Represents a location</p>
</dd>
<dt><a href="#Mob">Mob</a> ⇐ <code><a href="#Base">Base</a></code></dt>
<dd><p>Represents a mob (living entity)</p>
</dd>
<dt><a href="#Monster">Monster</a> ⇐ <code><a href="#Mob">Mob</a></code></dt>
<dd><p>Represents a monster (a non-player-controlled mob)</p>
</dd>
<dt><a href="#Player">Player</a> ⇐ <code><a href="#Mob">Mob</a></code></dt>
<dd><p>Represents a player</p>
</dd>
<dt><a href="#World">World</a> ⇐ <code>AsyncEventEmitter</code></dt>
<dd><p>Represents a world and is the main class that all other classes connect to.</p>
</dd>
</dl>

<a name="Collection"></a>

## Collection ⇐ <code>Map</code>
A Map with some extra functions where the ID is used as an identifier

**Kind**: global class  
**Extends**: <code>Map</code>  
**Access**: public  

* [Collection](#Collection) ⇐ <code>Map</code>
    * [new Collection(type)](#new_Collection_new)
    * [.add(objects)](#Collection+add) ⇒ <code>void</code>
    * [.remove(objectResolvables)](#Collection+remove) ⇒ <code>void</code>
    * [.resolve(objectResolvables)](#Collection+resolve) ⇒ <code>Object</code>
    * [.every(condition)](#Collection+every) ⇒ <code>Boolean</code>
    * [.find(condition)](#Collection+find) ⇒ <code>Object</code>

<a name="new_Collection_new"></a>

### new Collection(type)

| Param | Type | Description |
| --- | --- | --- |
| type | <code>Class</code> | The class that this collection is for |

<a name="Collection+add"></a>

### collection.add(objects) ⇒ <code>void</code>
Adds objects (or an object) to the collection

**Kind**: instance method of [<code>Collection</code>](#Collection)  

| Param | Type |
| --- | --- |
| objects | <code>Object</code> \| <code>Collection.&lt;Object&gt;</code> \| <code>Array.&lt;Object&gt;</code> | 

<a name="Collection+remove"></a>

### collection.remove(objectResolvables) ⇒ <code>void</code>
Removes objects (or an object) from the collection

**Kind**: instance method of [<code>Collection</code>](#Collection)  

| Param | Type | Description |
| --- | --- | --- |
| objectResolvables | <code>undefined</code> \| <code>Collection.&lt;Object&gt;</code> \| <code>Array.&lt;ObjectResolvable&gt;</code> \| <code>ObjectResolvable</code> | If this value is undefined, all items are removed from the collection |

<a name="Collection+resolve"></a>

### collection.resolve(objectResolvables) ⇒ <code>Object</code>
Resolves ObjectResolvables (or ObjectResolvables) to an object in the collection

**Kind**: instance method of [<code>Collection</code>](#Collection)  

| Param | Type |
| --- | --- |
| objectResolvables | <code>Collection.&lt;Object&gt;</code> \| <code>Array.&lt;ObjectResolvable&gt;</code> \| <code>ObjectResolvable</code> | 

<a name="Collection+every"></a>

### collection.every(condition) ⇒ <code>Boolean</code>
Same as Array.every(). Returns true if every item in this collection passes the provided condition.

**Kind**: instance method of [<code>Collection</code>](#Collection)  

| Param | Type | Description |
| --- | --- | --- |
| condition | <code>function</code> | The condition function to test with |

<a name="Collection+find"></a>

### collection.find(condition) ⇒ <code>Object</code>
Same as Array.find(). Returns the first item in this collection that satisfies the provided condition.

**Kind**: instance method of [<code>Collection</code>](#Collection)  

| Param | Type | Description |
| --- | --- | --- |
| condition | <code>function</code> | The condition function to test with |

<a name="CommandHandler"></a>

## CommandHandler ⇐ [<code>Base</code>](#Base)
Handles incoming messages containing commands

**Kind**: global class  
**Extends**: [<code>Base</code>](#Base)  

* [CommandHandler](#CommandHandler) ⇐ [<code>Base</code>](#Base)
    * [new CommandHandler(world, options)](#new_CommandHandler_new)
    * [.commands](#CommandHandler+commands) : <code>Object</code>
    * [.condition](#CommandHandler+condition) : <code>function</code>
    * [.channel](#CommandHandler+channel) : <code>GuildChannel</code>
    * [.id](#Base+id) : <code>String</code>
    * [.world](#Base+world) : [<code>World</code>](#World)
    * [.guild](#Base+guild) : <code>Guild</code>
    * [.add(commands)](#CommandHandler+add)
    * [.remove(...commands)](#CommandHandler+remove)

<a name="new_CommandHandler_new"></a>

### new CommandHandler(world, options)

| Param | Type | Description |
| --- | --- | --- |
| world | [<code>World</code>](#World) | The World object to add this CommandHandler to |
| options | <code>Object</code> | The options for this CommandHandler |

<a name="CommandHandler+commands"></a>

### commandHandler.commands : <code>Object</code>
An object containing all the commands this handler deals with.Commands are in the key value format, where the key is the command the user uses, and where the value is the function to be called.An arguments array is passed to the function that contains the rest of the user's message.

**Kind**: instance property of [<code>CommandHandler</code>](#CommandHandler)  
**Access**: public  
<a name="CommandHandler+condition"></a>

### commandHandler.condition : <code>function</code>
A condition function that each message must meet in order to be passed to the CommandHandler.

**Kind**: instance property of [<code>CommandHandler</code>](#CommandHandler)  
**Access**: public  
**Example**  
```js
(message) => message.member.id == this.mob.guildMember.id
```
<a name="CommandHandler+channel"></a>

### commandHandler.channel : <code>GuildChannel</code>
An optional argument that limits the handler to a specific channel

**Kind**: instance property of [<code>CommandHandler</code>](#CommandHandler)  
**Access**: public  
<a name="Base+id"></a>

### commandHandler.id : <code>String</code>
A unique identifier

**Kind**: instance property of [<code>CommandHandler</code>](#CommandHandler)  
**Overrides**: [<code>id</code>](#Base+id)  
<a name="Base+world"></a>

### commandHandler.world : [<code>World</code>](#World)
The world associated with this object

**Kind**: instance property of [<code>CommandHandler</code>](#CommandHandler)  
**Overrides**: [<code>world</code>](#Base+world)  
<a name="Base+guild"></a>

### commandHandler.guild : <code>Guild</code>
The guild associated with this object

**Kind**: instance property of [<code>CommandHandler</code>](#CommandHandler)  
**Overrides**: [<code>guild</code>](#Base+guild)  
<a name="CommandHandler+add"></a>

### commandHandler.add(commands)
Adds commands to the handler listFormat for the "commands" option is similar to the one used when creating a CommandHandler

**Kind**: instance method of [<code>CommandHandler</code>](#CommandHandler)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| commands | <code>Object</code> | An object containing the commands to be added. |

**Example**  
```js
myCommandHandler.add({	"pickup": (args) => {		//some code	}});
```
<a name="CommandHandler+remove"></a>

### commandHandler.remove(...commands)
Removes commands from the handler list

**Kind**: instance method of [<code>CommandHandler</code>](#CommandHandler)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| ...commands | <code>String</code> | Strings denoting the key of each command |

**Example**  
```js
myCommandHandler.remove("pickup", "drop", "attack");
```
<a name="Action"></a>

## Action ⇐ [<code>Base</code>](#Base)
Represents an action performed by a mob entity

**Kind**: global class  
**Extends**: [<code>Base</code>](#Base)  

* [Action](#Action) ⇐ [<code>Base</code>](#Base)
    * [new Action(world, string)](#new_Action_new)
    * [.mob](#Action+mob) : [<code>Mob</code>](#Mob)
    * [.location](#Action+location) : [<code>Location</code>](#Location)
    * [.string](#Action+string) : <code>String</code>
    * [.battle](#Action+battle) : [<code>Battle</code>](#Battle)
    * [.id](#Base+id) : <code>String</code>
    * [.world](#Base+world) : [<code>World</code>](#World)
    * [.guild](#Base+guild) : <code>Guild</code>

<a name="new_Action_new"></a>

### new Action(world, string)

| Param | Type | Description |
| --- | --- | --- |
| world | [<code>World</code>](#World) | The world in which this action should be performed |
| string | <code>String</code> | The string describing this action |

<a name="Action+mob"></a>

### action.mob : [<code>Mob</code>](#Mob)
The mob that performed this action

**Kind**: instance property of [<code>Action</code>](#Action)  
<a name="Action+location"></a>

### action.location : [<code>Location</code>](#Location)
The location where this action was performed

**Kind**: instance property of [<code>Action</code>](#Action)  
<a name="Action+string"></a>

### action.string : <code>String</code>
A description of the action (this is what the end-user sees)

**Kind**: instance property of [<code>Action</code>](#Action)  
<a name="Action+battle"></a>

### action.battle : [<code>Battle</code>](#Battle)
The battle in which this action was performed (if any)

**Kind**: instance property of [<code>Action</code>](#Action)  
<a name="Base+id"></a>

### action.id : <code>String</code>
A unique identifier

**Kind**: instance property of [<code>Action</code>](#Action)  
**Overrides**: [<code>id</code>](#Base+id)  
<a name="Base+world"></a>

### action.world : [<code>World</code>](#World)
The world associated with this object

**Kind**: instance property of [<code>Action</code>](#Action)  
**Overrides**: [<code>world</code>](#Base+world)  
<a name="Base+guild"></a>

### action.guild : <code>Guild</code>
The guild associated with this object

**Kind**: instance property of [<code>Action</code>](#Action)  
**Overrides**: [<code>guild</code>](#Base+guild)  
<a name="Base"></a>

## *Base ⇐ <code>AsyncEventEmitter</code>*
The base class for most other classes

**Kind**: global abstract class  
**Extends**: <code>AsyncEventEmitter</code>  

* *[Base](#Base) ⇐ <code>AsyncEventEmitter</code>*
    * *[new Base(world)](#new_Base_new)*
    * *[.id](#Base+id) : <code>String</code>*
    * *[.world](#Base+world) : [<code>World</code>](#World)*
    * *[.guild](#Base+guild) : <code>Guild</code>*

<a name="new_Base_new"></a>

### *new Base(world)*

| Param | Type | Description |
| --- | --- | --- |
| world | [<code>World</code>](#World) | The world that this object should be attached to |

<a name="Base+id"></a>

### *base.id : <code>String</code>*
A unique identifier

**Kind**: instance property of [<code>Base</code>](#Base)  
<a name="Base+world"></a>

### *base.world : [<code>World</code>](#World)*
The world associated with this object

**Kind**: instance property of [<code>Base</code>](#Base)  
<a name="Base+guild"></a>

### *base.guild : <code>Guild</code>*
The guild associated with this object

**Kind**: instance property of [<code>Base</code>](#Base)  
<a name="Battle"></a>

## Battle ⇐ [<code>Base</code>](#Base)
Represents a battle.

**Kind**: global class  
**Extends**: [<code>Base</code>](#Base)  

* [Battle](#Battle) ⇐ [<code>Base</code>](#Base)
    * [new Battle(world, options)](#new_Battle_new)
    * [.location](#Battle+location) : [<code>Location</code>](#Location)
    * [.name](#Battle+name) : <code>String</code>
    * [.mobs](#Battle+mobs) : [<code>Collection.&lt;Mob&gt;</code>](#Mob)
    * [.currentRound](#Battle+currentRound) : <code>Number</code>
    * [.actions](#Battle+actions) : [<code>Collection.&lt;Action&gt;</code>](#Action)
    * [.roundTimeLimit](#Battle+roundTimeLimit) : <code>Number</code>
    * [.started](#Battle+started) : <code>Boolean</code>
    * [.id](#Base+id) : <code>String</code>
    * [.world](#Base+world) : [<code>World</code>](#World)
    * [.guild](#Base+guild) : <code>Guild</code>
    * [.start()](#Battle+start) ⇒ <code>Promise.&lt;void&gt;</code>
    * [.addMob(mobResolvable)](#Battle+addMob) ⇒ <code>Promise.&lt;void&gt;</code>
    * [.removeMob(mobResolvable)](#Battle+removeMob) ⇒ <code>Promise.&lt;void&gt;</code>
    * [.end()](#Battle+end) ⇒ <code>Promise.&lt;void&gt;</code>
    * ["roundEnd"](#Battle+event_roundEnd)
    * ["actionTaken" (action)](#Battle+event_actionTaken)
    * ["mobJoined" (mob)](#Battle+event_mobJoined)
    * ["mobLeft" (mob)](#Battle+event_mobLeft)
    * ["started"](#Battle+event_started)

<a name="new_Battle_new"></a>

### new Battle(world, options)

| Param | Type | Description |
| --- | --- | --- |
| world | [<code>World</code>](#World) | The world to create this battle in |
| options | <code>Object</code> | The options to create this battle with |

<a name="Battle+location"></a>

### battle.location : [<code>Location</code>](#Location)
The location where this battle is taking place

**Kind**: instance property of [<code>Battle</code>](#Battle)  
<a name="Battle+name"></a>

### battle.name : <code>String</code>
The name of the battle

**Kind**: instance property of [<code>Battle</code>](#Battle)  
**Default**: <code>&quot;A Battle&quot;</code>  
<a name="Battle+mobs"></a>

### battle.mobs : [<code>Collection.&lt;Mob&gt;</code>](#Mob)
All mobs participating in this battle

**Kind**: instance property of [<code>Battle</code>](#Battle)  
<a name="Battle+currentRound"></a>

### battle.currentRound : <code>Number</code>
The current round number of this battle

**Kind**: instance property of [<code>Battle</code>](#Battle)  
<a name="Battle+actions"></a>

### battle.actions : [<code>Collection.&lt;Action&gt;</code>](#Action)
All actions that have been taken in this battle

**Kind**: instance property of [<code>Battle</code>](#Battle)  
<a name="Battle+roundTimeLimit"></a>

### battle.roundTimeLimit : <code>Number</code>
The amount of time all participating mobs have to perform actions before the round ends

**Kind**: instance property of [<code>Battle</code>](#Battle)  
**Default**: <code>60000</code>  
<a name="Battle+started"></a>

### battle.started : <code>Boolean</code>
Indicates whether the battle has started or not

**Kind**: instance property of [<code>Battle</code>](#Battle)  
<a name="Base+id"></a>

### battle.id : <code>String</code>
A unique identifier

**Kind**: instance property of [<code>Battle</code>](#Battle)  
**Overrides**: [<code>id</code>](#Base+id)  
<a name="Base+world"></a>

### battle.world : [<code>World</code>](#World)
The world associated with this object

**Kind**: instance property of [<code>Battle</code>](#Battle)  
**Overrides**: [<code>world</code>](#Base+world)  
<a name="Base+guild"></a>

### battle.guild : <code>Guild</code>
The guild associated with this object

**Kind**: instance property of [<code>Battle</code>](#Battle)  
**Overrides**: [<code>guild</code>](#Base+guild)  
<a name="Battle+start"></a>

### battle.start() ⇒ <code>Promise.&lt;void&gt;</code>
Starts this battle

**Kind**: instance method of [<code>Battle</code>](#Battle)  
**Access**: public  
<a name="Battle+addMob"></a>

### battle.addMob(mobResolvable) ⇒ <code>Promise.&lt;void&gt;</code>
Adds a mob to this battle

**Kind**: instance method of [<code>Battle</code>](#Battle)  
**Access**: public  

| Param | Type |
| --- | --- |
| mobResolvable | <code>MobResolvable</code> | 

<a name="Battle+removeMob"></a>

### battle.removeMob(mobResolvable) ⇒ <code>Promise.&lt;void&gt;</code>
Removes a mob from this battle

**Kind**: instance method of [<code>Battle</code>](#Battle)  
**Access**: public  

| Param | Type |
| --- | --- |
| mobResolvable | <code>MobResolvable</code> | 

<a name="Battle+end"></a>

### battle.end() ⇒ <code>Promise.&lt;void&gt;</code>
Ends this battle

**Kind**: instance method of [<code>Battle</code>](#Battle)  
**Access**: public  
<a name="Battle+event_roundEnd"></a>

### "roundEnd"
Emitted when a round has ended

**Kind**: event emitted by [<code>Battle</code>](#Battle)  
<a name="Battle+event_actionTaken"></a>

### "actionTaken" (action)
Emitted when an action is taken

**Kind**: event emitted by [<code>Battle</code>](#Battle)  

| Param | Type |
| --- | --- |
| action | [<code>Action</code>](#Action) | 

<a name="Battle+event_mobJoined"></a>

### "mobJoined" (mob)
Emitted when a mob joins this battle

**Kind**: event emitted by [<code>Battle</code>](#Battle)  

| Param | Type |
| --- | --- |
| mob | [<code>Mob</code>](#Mob) | 

<a name="Battle+event_mobLeft"></a>

### "mobLeft" (mob)
Emitted when a mob leaves this battle

**Kind**: event emitted by [<code>Battle</code>](#Battle)  

| Param | Type |
| --- | --- |
| mob | [<code>Mob</code>](#Mob) | 

<a name="Battle+event_started"></a>

### "started"
Emitted when this battle starts

**Kind**: event emitted by [<code>Battle</code>](#Battle)  
<a name="Location"></a>

## Location ⇐ [<code>Base</code>](#Base)
Represents a location

**Kind**: global class  
**Extends**: [<code>Base</code>](#Base)  
**Access**: public  

* [Location](#Location) ⇐ [<code>Base</code>](#Base)
    * [new Location(world, options)](#new_Location_new)
    * [.generated](#Location+generated) : <code>Boolean</code>
    * [.mobs](#Location+mobs) : [<code>Collection.&lt;Mob&gt;</code>](#Mob)
    * [.actions](#Location+actions) : [<code>Collection.&lt;Action&gt;</code>](#Action)
    * [.role](#Location+role) : <code>Role</code>
    * [.category](#Location+category) : <code>CategoryChannel</code>
    * [.textChannel](#Location+textChannel) : <code>TextChannel</code>
    * [.voiceChannel](#Location+voiceChannel) : <code>VoiceChannel</code>
    * [.spacerChannel](#Location+spacerChannel) : <code>TextChannel</code>
    * [.name](#Location+name) : <code>String</code>
    * [.locations](#Location+locations) : [<code>Collection.&lt;Location&gt;</code>](#Location)
    * [.buttons](#Location+buttons) : <code>Collection.&lt;VoiceChannel&gt;</code>
    * [.id](#Base+id) : <code>String</code>
    * [.world](#Base+world) : [<code>World</code>](#World)
    * [.guild](#Base+guild) : <code>Guild</code>
    * [.generate()](#Location+generate) ⇒ <code>Promise.&lt;void&gt;</code>
    * [.ungenerate()](#Location+ungenerate) ⇒ <code>Promise.&lt;void&gt;</code>
    * [.attach(locationResolvable)](#Location+attach) ⇒ <code>Promise.&lt;void&gt;</code>
    * [.narrate(message)](#Location+narrate) ⇒ <code>Promise.&lt;Message&gt;</code>
    * ["generated"](#Location+event_generated)
    * ["ungenerated"](#Location+event_ungenerated)
    * ["locationAttached" ([location])](#Location+event_locationAttached)
    * ["narration" ([message])](#Location+event_narration)
    * ["actionTaken" ([action])](#Location+event_actionTaken)
    * ["mobLeft" ([mob])](#Location+event_mobLeft)
    * ["mobJoined" ([mob])](#Location+event_mobJoined)

<a name="new_Location_new"></a>

### new Location(world, options)

| Param | Type |
| --- | --- |
| world | [<code>World</code>](#World) | 
| options | <code>Object</code> | 

<a name="Location+generated"></a>

### location.generated : <code>Boolean</code>
Indicates whether this location has been generated

**Kind**: instance property of [<code>Location</code>](#Location)  
**Access**: public  
<a name="Location+mobs"></a>

### location.mobs : [<code>Collection.&lt;Mob&gt;</code>](#Mob)
All mobs currently at this location

**Kind**: instance property of [<code>Location</code>](#Location)  
**Access**: public  
<a name="Location+actions"></a>

### location.actions : [<code>Collection.&lt;Action&gt;</code>](#Action)
All actions taken at this location

**Kind**: instance property of [<code>Location</code>](#Location)  
**Access**: public  
<a name="Location+role"></a>

### location.role : <code>Role</code>
The role associated with this location

**Kind**: instance property of [<code>Location</code>](#Location)  
**Access**: public  
<a name="Location+category"></a>

### location.category : <code>CategoryChannel</code>
The category associated with this location

**Kind**: instance property of [<code>Location</code>](#Location)  
**Access**: public  
<a name="Location+textChannel"></a>

### location.textChannel : <code>TextChannel</code>
The text channel associated with this location

**Kind**: instance property of [<code>Location</code>](#Location)  
**Access**: public  
<a name="Location+voiceChannel"></a>

### location.voiceChannel : <code>VoiceChannel</code>
The voice channel associated with this location

**Kind**: instance property of [<code>Location</code>](#Location)  
**Access**: public  
<a name="Location+spacerChannel"></a>

### location.spacerChannel : <code>TextChannel</code>
The channel used as a separator between the button channels and the voice/text channels

**Kind**: instance property of [<code>Location</code>](#Location)  
**Access**: public  
<a name="Location+name"></a>

### location.name : <code>String</code>
The name of the location

**Kind**: instance property of [<code>Location</code>](#Location)  
**Access**: public  
<a name="Location+locations"></a>

### location.locations : [<code>Collection.&lt;Location&gt;</code>](#Location)
Any and all locations attached to this location

**Kind**: instance property of [<code>Location</code>](#Location)  
**Access**: public  
<a name="Location+buttons"></a>

### location.buttons : <code>Collection.&lt;VoiceChannel&gt;</code>
Contains all the voice channel buttons for moving between locations

**Kind**: instance property of [<code>Location</code>](#Location)  
**Access**: public  
<a name="Base+id"></a>

### location.id : <code>String</code>
A unique identifier

**Kind**: instance property of [<code>Location</code>](#Location)  
**Overrides**: [<code>id</code>](#Base+id)  
<a name="Base+world"></a>

### location.world : [<code>World</code>](#World)
The world associated with this object

**Kind**: instance property of [<code>Location</code>](#Location)  
**Overrides**: [<code>world</code>](#Base+world)  
<a name="Base+guild"></a>

### location.guild : <code>Guild</code>
The guild associated with this object

**Kind**: instance property of [<code>Location</code>](#Location)  
**Overrides**: [<code>guild</code>](#Base+guild)  
<a name="Location+generate"></a>

### location.generate() ⇒ <code>Promise.&lt;void&gt;</code>
Creates the role and channels for this location and links the associated locations to the newly created button channels

**Kind**: instance method of [<code>Location</code>](#Location)  
**Access**: public  
<a name="Location+ungenerate"></a>

### location.ungenerate() ⇒ <code>Promise.&lt;void&gt;</code>
Reverses the effects of the `generate()` method

**Kind**: instance method of [<code>Location</code>](#Location)  
**Access**: public  
<a name="Location+attach"></a>

### location.attach(locationResolvable) ⇒ <code>Promise.&lt;void&gt;</code>
Places a location next to this one

**Kind**: instance method of [<code>Location</code>](#Location)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| locationResolvable | <code>LocationResolvable</code> | The location to attach |

<a name="Location+narrate"></a>

### location.narrate(message) ⇒ <code>Promise.&lt;Message&gt;</code>
Sends a narration message to the `textChannel` property channel

**Kind**: instance method of [<code>Location</code>](#Location)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>String</code> | The message text |

<a name="Location+event_generated"></a>

### "generated"
Emitted when this location is generated

**Kind**: event emitted by [<code>Location</code>](#Location)  
<a name="Location+event_ungenerated"></a>

### "ungenerated"
Emitted when this location is ungenerated

**Kind**: event emitted by [<code>Location</code>](#Location)  
<a name="Location+event_locationAttached"></a>

### "locationAttached" ([location])
Emitted when another location is attached to this one

**Kind**: event emitted by [<code>Location</code>](#Location)  

| Param | Type |
| --- | --- |
| [location] | [<code>Location</code>](#Location) | 

<a name="Location+event_narration"></a>

### "narration" ([message])
Emitted when a narration message is sent

**Kind**: event emitted by [<code>Location</code>](#Location)  

| Param | Type |
| --- | --- |
| [message] | <code>Message</code> | 

<a name="Location+event_actionTaken"></a>

### "actionTaken" ([action])
Emitted when an action is taken at this location

**Kind**: event emitted by [<code>Location</code>](#Location)  

| Param | Type | Description |
| --- | --- | --- |
| [action] | [<code>Action</code>](#Action) | The action that was taken |

<a name="Location+event_mobLeft"></a>

### "mobLeft" ([mob])
Emitted when a mob leaves this location

**Kind**: event emitted by [<code>Location</code>](#Location)  

| Param | Type | Description |
| --- | --- | --- |
| [mob] | [<code>Mob</code>](#Mob) | The mob that left this location |

<a name="Location+event_mobJoined"></a>

### "mobJoined" ([mob])
Emitted when a mob joins this location

**Kind**: event emitted by [<code>Location</code>](#Location)  

| Param | Type | Description |
| --- | --- | --- |
| [mob] | [<code>Mob</code>](#Mob) | The mob that joined this location |

<a name="Mob"></a>

## *Mob ⇐ [<code>Base</code>](#Base)*
Represents a mob (living entity)

**Kind**: global abstract class  
**Extends**: [<code>Base</code>](#Base)  

* *[Mob](#Mob) ⇐ [<code>Base</code>](#Base)*
    * *[.name](#Mob+name) : <code>String</code>*
    * *[.actions](#Mob+actions) : [<code>Collection</code>](#Collection)*
    * *[.iconURL](#Mob+iconURL) : <code>String</code>*
    * *[.description](#Mob+description) : <code>String</code>*
    * *[.actionsPerRound](#Mob+actionsPerRound) : <code>Number</code>*
    * *[.actionsTakenThisRound](#Mob+actionsTakenThisRound) : <code>Number</code>*
    * *[.location](#Mob+location) : [<code>Location</code>](#Location)*
    * *[.battle](#Mob+battle) : [<code>Battle</code>](#Battle)*
    * *[.spawned](#Mob+spawned) : <code>Boolean</code>*
    * *[.id](#Base+id) : <code>String</code>*
    * *[.world](#Base+world) : [<code>World</code>](#World)*
    * *[.guild](#Base+guild) : <code>Guild</code>*
    * *[.spawn()](#Mob+spawn) ⇒ <code>Promise.&lt;void&gt;</code>*
    * *[.action(action)](#Mob+action) ⇒ [<code>Promise.&lt;Action&gt;</code>](#Action)*
    * *[.move(locationResolvable)](#Mob+move) ⇒ <code>Promise</code>*
    * *["changedLocation" ([oldLocation], [newLocation])](#Mob+event_changedLocation)*
    * *["actionTaken" ([action])](#Mob+event_actionTaken)*

<a name="Mob+name"></a>

### *mob.name : <code>String</code>*
The name of this mob

**Kind**: instance property of [<code>Mob</code>](#Mob)  
**Access**: public  
<a name="Mob+actions"></a>

### *mob.actions : [<code>Collection</code>](#Collection)*
All the actions that this mob has taken

**Kind**: instance property of [<code>Mob</code>](#Mob)  
**Access**: public  
<a name="Mob+iconURL"></a>

### *mob.iconURL : <code>String</code>*
The URL of the picture used for icons on embeds relating to this mob

**Kind**: instance property of [<code>Mob</code>](#Mob)  
**Access**: public  
<a name="Mob+description"></a>

### *mob.description : <code>String</code>*
A description of this mob

**Kind**: instance property of [<code>Mob</code>](#Mob)  
**Access**: public  
<a name="Mob+actionsPerRound"></a>

### *mob.actionsPerRound : <code>Number</code>*
The number of actions this mob is allowed to take per-round in a battle

**Kind**: instance property of [<code>Mob</code>](#Mob)  
**Default**: <code>1</code>  
**Access**: public  
<a name="Mob+actionsTakenThisRound"></a>

### *mob.actionsTakenThisRound : <code>Number</code>*
The number of actions this mob has taken in the current round (if in a battle)

**Kind**: instance property of [<code>Mob</code>](#Mob)  
**Access**: public  
<a name="Mob+location"></a>

### *mob.location : [<code>Location</code>](#Location)*
The location this mob is currently at

**Kind**: instance property of [<code>Mob</code>](#Mob)  
**Access**: public  
<a name="Mob+battle"></a>

### *mob.battle : [<code>Battle</code>](#Battle)*
The battle this mob is currently in (if any)

**Kind**: instance property of [<code>Mob</code>](#Mob)  
**Access**: public  
<a name="Mob+spawned"></a>

### *mob.spawned : <code>Boolean</code>*
Whether or not this mob is currently spawned

**Kind**: instance property of [<code>Mob</code>](#Mob)  
**Access**: public  
<a name="Base+id"></a>

### *mob.id : <code>String</code>*
A unique identifier

**Kind**: instance property of [<code>Mob</code>](#Mob)  
**Overrides**: [<code>id</code>](#Base+id)  
<a name="Base+world"></a>

### *mob.world : [<code>World</code>](#World)*
The world associated with this object

**Kind**: instance property of [<code>Mob</code>](#Mob)  
**Overrides**: [<code>world</code>](#Base+world)  
<a name="Base+guild"></a>

### *mob.guild : <code>Guild</code>*
The guild associated with this object

**Kind**: instance property of [<code>Mob</code>](#Mob)  
**Overrides**: [<code>guild</code>](#Base+guild)  
<a name="Mob+spawn"></a>

### *mob.spawn() ⇒ <code>Promise.&lt;void&gt;</code>*
Spawns this mob into existence

**Kind**: instance method of [<code>Mob</code>](#Mob)  
**Access**: public  
<a name="Mob+action"></a>

### *mob.action(action) ⇒ [<code>Promise.&lt;Action&gt;</code>](#Action)*
Have this mob take an action

**Kind**: instance method of [<code>Mob</code>](#Mob)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| action | [<code>Action</code>](#Action) | An Action object |

<a name="Mob+move"></a>

### *mob.move(locationResolvable) ⇒ <code>Promise</code>*
Move this mob to a location

**Kind**: instance method of [<code>Mob</code>](#Mob)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| locationResolvable | <code>LocationResolvable</code> | A resolvable of the location to move to |

<a name="Mob+event_changedLocation"></a>

### *"changedLocation" ([oldLocation], [newLocation])*
Emitted when this mob changes locations

**Kind**: event emitted by [<code>Mob</code>](#Mob)  

| Param | Type | Description |
| --- | --- | --- |
| [oldLocation] | [<code>Location</code>](#Location) | Previous location |
| [newLocation] | [<code>Location</code>](#Location) | New location |

<a name="Mob+event_actionTaken"></a>

### *"actionTaken" ([action])*
Emitted when this mob takes an action

**Kind**: event emitted by [<code>Mob</code>](#Mob)  

| Param | Type | Description |
| --- | --- | --- |
| [action] | [<code>Action</code>](#Action) | The action that was taken |

<a name="Monster"></a>

## Monster ⇐ [<code>Mob</code>](#Mob)
Represents a monster (a non-player-controlled mob)

**Kind**: global class  
**Extends**: [<code>Mob</code>](#Mob)  
**Access**: public  

* [Monster](#Monster) ⇐ [<code>Mob</code>](#Mob)
    * [new Monster(world, options)](#new_Monster_new)
    * [.name](#Mob+name) : <code>String</code>
    * [.actions](#Mob+actions) : [<code>Collection</code>](#Collection)
    * [.iconURL](#Mob+iconURL) : <code>String</code>
    * [.description](#Mob+description) : <code>String</code>
    * [.actionsPerRound](#Mob+actionsPerRound) : <code>Number</code>
    * [.actionsTakenThisRound](#Mob+actionsTakenThisRound) : <code>Number</code>
    * [.location](#Mob+location) : [<code>Location</code>](#Location)
    * [.battle](#Mob+battle) : [<code>Battle</code>](#Battle)
    * [.spawned](#Mob+spawned) : <code>Boolean</code>
    * [.id](#Base+id) : <code>String</code>
    * [.world](#Base+world) : [<code>World</code>](#World)
    * [.guild](#Base+guild) : <code>Guild</code>
    * [.spawn()](#Mob+spawn) ⇒ <code>Promise.&lt;void&gt;</code>
    * [.action(action)](#Mob+action) ⇒ [<code>Promise.&lt;Action&gt;</code>](#Action)
    * [.move(locationResolvable)](#Mob+move) ⇒ <code>Promise</code>
    * ["changedLocation" ([oldLocation], [newLocation])](#Mob+event_changedLocation)
    * ["actionTaken" ([action])](#Mob+event_actionTaken)

<a name="new_Monster_new"></a>

### new Monster(world, options)

| Param | Type | Description |
| --- | --- | --- |
| world | [<code>World</code>](#World) | The world to create this monster in |
| options | <code>Object</code> | The options to create this monster with |

<a name="Mob+name"></a>

### monster.name : <code>String</code>
The name of this mob

**Kind**: instance property of [<code>Monster</code>](#Monster)  
**Overrides**: [<code>name</code>](#Mob+name)  
**Access**: public  
<a name="Mob+actions"></a>

### monster.actions : [<code>Collection</code>](#Collection)
All the actions that this mob has taken

**Kind**: instance property of [<code>Monster</code>](#Monster)  
**Overrides**: [<code>actions</code>](#Mob+actions)  
**Access**: public  
<a name="Mob+iconURL"></a>

### monster.iconURL : <code>String</code>
The URL of the picture used for icons on embeds relating to this mob

**Kind**: instance property of [<code>Monster</code>](#Monster)  
**Overrides**: [<code>iconURL</code>](#Mob+iconURL)  
**Access**: public  
<a name="Mob+description"></a>

### monster.description : <code>String</code>
A description of this mob

**Kind**: instance property of [<code>Monster</code>](#Monster)  
**Overrides**: [<code>description</code>](#Mob+description)  
**Access**: public  
<a name="Mob+actionsPerRound"></a>

### monster.actionsPerRound : <code>Number</code>
The number of actions this mob is allowed to take per-round in a battle

**Kind**: instance property of [<code>Monster</code>](#Monster)  
**Default**: <code>1</code>  
**Overrides**: [<code>actionsPerRound</code>](#Mob+actionsPerRound)  
**Access**: public  
<a name="Mob+actionsTakenThisRound"></a>

### monster.actionsTakenThisRound : <code>Number</code>
The number of actions this mob has taken in the current round (if in a battle)

**Kind**: instance property of [<code>Monster</code>](#Monster)  
**Overrides**: [<code>actionsTakenThisRound</code>](#Mob+actionsTakenThisRound)  
**Access**: public  
<a name="Mob+location"></a>

### monster.location : [<code>Location</code>](#Location)
The location this mob is currently at

**Kind**: instance property of [<code>Monster</code>](#Monster)  
**Overrides**: [<code>location</code>](#Mob+location)  
**Access**: public  
<a name="Mob+battle"></a>

### monster.battle : [<code>Battle</code>](#Battle)
The battle this mob is currently in (if any)

**Kind**: instance property of [<code>Monster</code>](#Monster)  
**Overrides**: [<code>battle</code>](#Mob+battle)  
**Access**: public  
<a name="Mob+spawned"></a>

### monster.spawned : <code>Boolean</code>
Whether or not this mob is currently spawned

**Kind**: instance property of [<code>Monster</code>](#Monster)  
**Overrides**: [<code>spawned</code>](#Mob+spawned)  
**Access**: public  
<a name="Base+id"></a>

### monster.id : <code>String</code>
A unique identifier

**Kind**: instance property of [<code>Monster</code>](#Monster)  
**Overrides**: [<code>id</code>](#Base+id)  
<a name="Base+world"></a>

### monster.world : [<code>World</code>](#World)
The world associated with this object

**Kind**: instance property of [<code>Monster</code>](#Monster)  
**Overrides**: [<code>world</code>](#Base+world)  
<a name="Base+guild"></a>

### monster.guild : <code>Guild</code>
The guild associated with this object

**Kind**: instance property of [<code>Monster</code>](#Monster)  
**Overrides**: [<code>guild</code>](#Base+guild)  
<a name="Mob+spawn"></a>

### monster.spawn() ⇒ <code>Promise.&lt;void&gt;</code>
Spawns this mob into existence

**Kind**: instance method of [<code>Monster</code>](#Monster)  
**Overrides**: [<code>spawn</code>](#Mob+spawn)  
**Access**: public  
<a name="Mob+action"></a>

### monster.action(action) ⇒ [<code>Promise.&lt;Action&gt;</code>](#Action)
Have this mob take an action

**Kind**: instance method of [<code>Monster</code>](#Monster)  
**Overrides**: [<code>action</code>](#Mob+action)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| action | [<code>Action</code>](#Action) | An Action object |

<a name="Mob+move"></a>

### monster.move(locationResolvable) ⇒ <code>Promise</code>
Move this mob to a location

**Kind**: instance method of [<code>Monster</code>](#Monster)  
**Overrides**: [<code>move</code>](#Mob+move)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| locationResolvable | <code>LocationResolvable</code> | A resolvable of the location to move to |

<a name="Mob+event_changedLocation"></a>

### "changedLocation" ([oldLocation], [newLocation])
Emitted when this mob changes locations

**Kind**: event emitted by [<code>Monster</code>](#Monster)  
**Overrides**: [<code>changedLocation</code>](#Mob+event_changedLocation)  

| Param | Type | Description |
| --- | --- | --- |
| [oldLocation] | [<code>Location</code>](#Location) | Previous location |
| [newLocation] | [<code>Location</code>](#Location) | New location |

<a name="Mob+event_actionTaken"></a>

### "actionTaken" ([action])
Emitted when this mob takes an action

**Kind**: event emitted by [<code>Monster</code>](#Monster)  
**Overrides**: [<code>actionTaken</code>](#Mob+event_actionTaken)  

| Param | Type | Description |
| --- | --- | --- |
| [action] | [<code>Action</code>](#Action) | The action that was taken |

<a name="Player"></a>

## Player ⇐ [<code>Mob</code>](#Mob)
Represents a player

**Kind**: global class  
**Extends**: [<code>Mob</code>](#Mob)  
**Access**: public  

* [Player](#Player) ⇐ [<code>Mob</code>](#Mob)
    * [new Player(world, options)](#new_Player_new)
    * [.guildMember](#Player+guildMember) : <code>GuildMember</code>
    * [.commandHandler](#Player+commandHandler) : [<code>CommandHandler</code>](#CommandHandler)
    * [.name](#Mob+name) : <code>String</code>
    * [.actions](#Mob+actions) : [<code>Collection</code>](#Collection)
    * [.iconURL](#Mob+iconURL) : <code>String</code>
    * [.description](#Mob+description) : <code>String</code>
    * [.actionsPerRound](#Mob+actionsPerRound) : <code>Number</code>
    * [.actionsTakenThisRound](#Mob+actionsTakenThisRound) : <code>Number</code>
    * [.location](#Mob+location) : [<code>Location</code>](#Location)
    * [.battle](#Mob+battle) : [<code>Battle</code>](#Battle)
    * [.spawned](#Mob+spawned) : <code>Boolean</code>
    * [.id](#Base+id) : <code>String</code>
    * [.world](#Base+world) : [<code>World</code>](#World)
    * [.guild](#Base+guild) : <code>Guild</code>
    * [.spawn()](#Mob+spawn) ⇒ <code>Promise.&lt;void&gt;</code>
    * [.action(action)](#Mob+action) ⇒ [<code>Promise.&lt;Action&gt;</code>](#Action)
    * [.move(locationResolvable)](#Mob+move) ⇒ <code>Promise</code>
    * ["changedLocation" ([oldLocation], [newLocation])](#Mob+event_changedLocation)
    * ["actionTaken" ([action])](#Mob+event_actionTaken)

<a name="new_Player_new"></a>

### new Player(world, options)

| Param | Type | Description |
| --- | --- | --- |
| world | [<code>World</code>](#World) | The world to create the player in |
| options | <code>Object</code> | The options to create the player with |

<a name="Player+guildMember"></a>

### player.guildMember : <code>GuildMember</code>
The GuildMember that this player is attached to

**Kind**: instance property of [<code>Player</code>](#Player)  
**Access**: public  
<a name="Player+commandHandler"></a>

### player.commandHandler : [<code>CommandHandler</code>](#CommandHandler)
The commandHandler for this player (The provided condition is that the message author must match this player's guildMember)

**Kind**: instance property of [<code>Player</code>](#Player)  
**Access**: public  
<a name="Mob+name"></a>

### player.name : <code>String</code>
The name of this mob

**Kind**: instance property of [<code>Player</code>](#Player)  
**Overrides**: [<code>name</code>](#Mob+name)  
**Access**: public  
<a name="Mob+actions"></a>

### player.actions : [<code>Collection</code>](#Collection)
All the actions that this mob has taken

**Kind**: instance property of [<code>Player</code>](#Player)  
**Overrides**: [<code>actions</code>](#Mob+actions)  
**Access**: public  
<a name="Mob+iconURL"></a>

### player.iconURL : <code>String</code>
The URL of the picture used for icons on embeds relating to this mob

**Kind**: instance property of [<code>Player</code>](#Player)  
**Overrides**: [<code>iconURL</code>](#Mob+iconURL)  
**Access**: public  
<a name="Mob+description"></a>

### player.description : <code>String</code>
A description of this mob

**Kind**: instance property of [<code>Player</code>](#Player)  
**Overrides**: [<code>description</code>](#Mob+description)  
**Access**: public  
<a name="Mob+actionsPerRound"></a>

### player.actionsPerRound : <code>Number</code>
The number of actions this mob is allowed to take per-round in a battle

**Kind**: instance property of [<code>Player</code>](#Player)  
**Default**: <code>1</code>  
**Overrides**: [<code>actionsPerRound</code>](#Mob+actionsPerRound)  
**Access**: public  
<a name="Mob+actionsTakenThisRound"></a>

### player.actionsTakenThisRound : <code>Number</code>
The number of actions this mob has taken in the current round (if in a battle)

**Kind**: instance property of [<code>Player</code>](#Player)  
**Overrides**: [<code>actionsTakenThisRound</code>](#Mob+actionsTakenThisRound)  
**Access**: public  
<a name="Mob+location"></a>

### player.location : [<code>Location</code>](#Location)
The location this mob is currently at

**Kind**: instance property of [<code>Player</code>](#Player)  
**Overrides**: [<code>location</code>](#Mob+location)  
**Access**: public  
<a name="Mob+battle"></a>

### player.battle : [<code>Battle</code>](#Battle)
The battle this mob is currently in (if any)

**Kind**: instance property of [<code>Player</code>](#Player)  
**Overrides**: [<code>battle</code>](#Mob+battle)  
**Access**: public  
<a name="Mob+spawned"></a>

### player.spawned : <code>Boolean</code>
Whether or not this mob is currently spawned

**Kind**: instance property of [<code>Player</code>](#Player)  
**Overrides**: [<code>spawned</code>](#Mob+spawned)  
**Access**: public  
<a name="Base+id"></a>

### player.id : <code>String</code>
A unique identifier

**Kind**: instance property of [<code>Player</code>](#Player)  
**Overrides**: [<code>id</code>](#Base+id)  
<a name="Base+world"></a>

### player.world : [<code>World</code>](#World)
The world associated with this object

**Kind**: instance property of [<code>Player</code>](#Player)  
**Overrides**: [<code>world</code>](#Base+world)  
<a name="Base+guild"></a>

### player.guild : <code>Guild</code>
The guild associated with this object

**Kind**: instance property of [<code>Player</code>](#Player)  
**Overrides**: [<code>guild</code>](#Base+guild)  
<a name="Mob+spawn"></a>

### player.spawn() ⇒ <code>Promise.&lt;void&gt;</code>
Spawns this mob into existence

**Kind**: instance method of [<code>Player</code>](#Player)  
**Overrides**: [<code>spawn</code>](#Mob+spawn)  
**Access**: public  
<a name="Mob+action"></a>

### player.action(action) ⇒ [<code>Promise.&lt;Action&gt;</code>](#Action)
Have this mob take an action

**Kind**: instance method of [<code>Player</code>](#Player)  
**Overrides**: [<code>action</code>](#Mob+action)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| action | [<code>Action</code>](#Action) | An Action object |

<a name="Mob+move"></a>

### player.move(locationResolvable) ⇒ <code>Promise</code>
Move this mob to a location

**Kind**: instance method of [<code>Player</code>](#Player)  
**Overrides**: [<code>move</code>](#Mob+move)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| locationResolvable | <code>LocationResolvable</code> | A resolvable of the location to move to |

<a name="Mob+event_changedLocation"></a>

### "changedLocation" ([oldLocation], [newLocation])
Emitted when this mob changes locations

**Kind**: event emitted by [<code>Player</code>](#Player)  
**Overrides**: [<code>changedLocation</code>](#Mob+event_changedLocation)  

| Param | Type | Description |
| --- | --- | --- |
| [oldLocation] | [<code>Location</code>](#Location) | Previous location |
| [newLocation] | [<code>Location</code>](#Location) | New location |

<a name="Mob+event_actionTaken"></a>

### "actionTaken" ([action])
Emitted when this mob takes an action

**Kind**: event emitted by [<code>Player</code>](#Player)  
**Overrides**: [<code>actionTaken</code>](#Mob+event_actionTaken)  

| Param | Type | Description |
| --- | --- | --- |
| [action] | [<code>Action</code>](#Action) | The action that was taken |

<a name="World"></a>

## World ⇐ <code>AsyncEventEmitter</code>
Represents a world and is the main class that all other classes connect to.

**Kind**: global class  
**Extends**: <code>AsyncEventEmitter</code>  
**Access**: public  

* [World](#World) ⇐ <code>AsyncEventEmitter</code>
    * [new World([options])](#new_World_new)
    * [.id](#World+id) : <code>String</code>
    * [.prefix](#World+prefix) : <code>String</code>
    * [.guild](#World+guild) : <code>Guild</code>
    * [.name](#World+name) : <code>String</code>
    * [.locations](#World+locations) : [<code>Collection</code>](#Collection)
    * [.mobs](#World+mobs) : [<code>Collection</code>](#Collection)
    * [.actions](#World+actions) : [<code>Collection</code>](#Collection)
    * [.battles](#World+battles) : [<code>Collection</code>](#Collection)
    * [.commandHandlers](#World+commandHandlers) : [<code>Collection</code>](#Collection)
    * [.bot](#World+bot) : <code>Client</code>
    * [.generateAll()](#World+generateAll) ⇒ <code>Promise.&lt;void&gt;</code>
    * [.ungenerateAll()](#World+ungenerateAll) ⇒ <code>Promise.&lt;void&gt;</code>
    * [.spawnAll()](#World+spawnAll) ⇒ <code>Promise.&lt;void&gt;</code>

<a name="new_World_new"></a>

### new World([options])

| Param | Type | Description |
| --- | --- | --- |
| [options] | <code>Object</code> | The options to create this world with |
| [options.name] | <code>String</code> | A name for the world |
| [options.prefix] | <code>String</code> | The prefix used to denote commands for this bot |
| [options.guild] | <code>Guild</code> | The guild this world should be attached to |

<a name="World+id"></a>

### world.id : <code>String</code>
A unique identifier

**Kind**: instance property of [<code>World</code>](#World)  
**Access**: public  
<a name="World+prefix"></a>

### world.prefix : <code>String</code>
The prefix used to denote commands for the bot

**Kind**: instance property of [<code>World</code>](#World)  
**Access**: public  
<a name="World+guild"></a>

### world.guild : <code>Guild</code>
The guild that this world is attached to

**Kind**: instance property of [<code>World</code>](#World)  
**Access**: public  
<a name="World+name"></a>

### world.name : <code>String</code>
The name of this world

**Kind**: instance property of [<code>World</code>](#World)  
**Default**: <code>&quot;A World&quot;</code>  
**Access**: public  
<a name="World+locations"></a>

### world.locations : [<code>Collection</code>](#Collection)
All locations contained within this world

**Kind**: instance property of [<code>World</code>](#World)  
**Access**: public  
<a name="World+mobs"></a>

### world.mobs : [<code>Collection</code>](#Collection)
All mobs contained within this world

**Kind**: instance property of [<code>World</code>](#World)  
**Access**: public  
<a name="World+actions"></a>

### world.actions : [<code>Collection</code>](#Collection)
All actions that have been performed in this world

**Kind**: instance property of [<code>World</code>](#World)  
**Access**: public  
<a name="World+battles"></a>

### world.battles : [<code>Collection</code>](#Collection)
All battle that are currently taking place in this world

**Kind**: instance property of [<code>World</code>](#World)  
**Access**: public  
<a name="World+commandHandlers"></a>

### world.commandHandlers : [<code>Collection</code>](#Collection)
All commandHandlers that have been created in this world

**Kind**: instance property of [<code>World</code>](#World)  
**Access**: public  
<a name="World+bot"></a>

### world.bot : <code>Client</code>
The Discord bot that is being used for this world

**Kind**: instance property of [<code>World</code>](#World)  
**Access**: public  
<a name="World+generateAll"></a>

### world.generateAll() ⇒ <code>Promise.&lt;void&gt;</code>
Runs the `generate()` method on every location that is attached to this world

**Kind**: instance method of [<code>World</code>](#World)  
**Access**: public  
<a name="World+ungenerateAll"></a>

### world.ungenerateAll() ⇒ <code>Promise.&lt;void&gt;</code>
The reverse of `generateAll()`Runs the `ungenerate()` method on every location that is attached to this world

**Kind**: instance method of [<code>World</code>](#World)  
**Access**: public  
<a name="World+spawnAll"></a>

### world.spawnAll() ⇒ <code>Promise.&lt;void&gt;</code>
Runs the `spawn()` method on every mob that is attached to this world

**Kind**: instance method of [<code>World</code>](#World)  
**Access**: public  
