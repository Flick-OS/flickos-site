export interface Testimonial {
	quote: string;
	name: string;
}

/** Link to the Facebook post the comments come from; the section links to it when set. */
export const testimonialsSource = '';

/**
 * Shown on the home page under "What people are saying". Quoted from comments
 * on the Facebook post: trimmed with "…", never reworded.
 */
export const testimonials: Testimonial[] = [
	{
		quote: 'I think it’s one of the most interesting distros I’ve come across recently. It is lightweight without looking like it, and offers something different to the usual suspects.',
		name: 'Neville W.',
	},
	{
		quote: 'I thought I’d throw up a VM and check it out. Well? It’s awesome. If you haven’t tried it, you should.',
		name: 'Maurice J.',
	},
	{
		quote: 'Great, easy to use, clean interface and fast! Works great even on 2013 celeron laptop. Keep up the good work!',
		name: 'Pekka K.',
	},
	{
		quote: 'I am on Windows since my first PC and this is the first distro I am willing to try.',
		name: 'Piotr K.',
	},
];
