---




Date: 2021-05-31

Topic:
-  Svelte Cheat Sheet
Ref:


---




### FAQ

* how svelte reactivity got triggered?

    by assignment

* get html ?


* how to make a variable reactive?
```
$: test = count * 2
```

* how to delcare props?

```
export let answers;

```

* how if then self work?
```
{#if user.loggedIn}
	<button on:click={toggle}>
		Log out
	</button>
{:else}
	<button on:click={toggle}>
		Log in
	</button>
{/if}
```

* loop?

```
{#each cats as cat}

{/each}


```


* need more practice

https://svelte.dev/tutorial/await-blocks

* how to uplift the states to higher component ?

```
<script>
	import CustomButton from './CustomButton.svelte';

	function handleClick() {
		alert('Button Clicked');
	}
</script>

<CustomButton on:click={handleClick}/>

//in <customer buttom >, forward the events

<button on:click>
	Click me
</button>
```

* how to bind input ?

```
<label>
	<input type=number bind:value={a} min=0 max=10>
	<input type=range bind:value={a} min=0 max=10>
</label>

```

* how to bind input to check box?

```
<label>
	<input type=checkbox bind:checked={yes}>
	Yes! Send me regular email spam
</label>

```

* how to bind select to array ?

```
	<input type=checkbox multiple bind:group={flavours} value={flavour}>
		{flavour}
```

* input box:

```
<div contenteditable="true"></div>

```

* lifecycle method

```

onMount
```


* how does it do data stores ?

```

count.update(n=>{})
count.set(n)


```

* how to bind it to a store ?

```
<input bind:value={$name}>
```


* what does class:big do ?

```

<div class:big>

check if variable big is true, if true then set to class big

```


* context vs stores;

	context are not reactive
	context only refer to the stores


### survey:

* Ref: [The truth about Svelte](https://gist.github.com/Rich-Harris/0f910048478c2a6505d1c32185b61934)

> Svelte is a language.

Specifically, Svelte is an attempt to answer a question that many people have asked, and a few have answered: what would it look like if we had a language for describing reactive user interfaces?

* Ref: [rfcs/0001-reactive-assignments.md at master · sveltejs/rfcs](https://github.com/sveltejs/rfcs/blob/master/text/0001-reactive-assignments.md)



